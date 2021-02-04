//Constants for the SVG
var width = 900,
height = 600;

//Set up the colour scale
var color = d3.scale.category10();

//Set up the force layout
var force = d3.layout.force()
.charge(-700)
.linkDistance(500)
.size([width, height]);


//Append a SVG to the body of the html page. Assign this SVG as an object to svg
var svg = d3.select("body").append("svg")
.attr("width", width)
.attr("height", height);


// hard-code some json
var graph = {
    "nodes":[
        {"name":"Myriel","group":1, url: "http://www.anywhere.com", text: "La paciencia de los fuertes"},
        {"name":"Napoleon","group":1, url: "http://www.anywhere.com", text: "Titulo impresionante"},
        {"name":"Mlle.Baptistine","group":1, url: "http://www.anywhere.com", text: "Titulin"},
        {"name":"Mme.Magloire","group":1, url: "http://www.anywhere.com", text: "Tituleque"},
        {"name":"CountessdeLo","group":1, url: "http://www.anywhere.com", text: "Las aventuras de jada"},
        {"name":"Geborand","group":1, url: "http://www.anywhere.com", text: "Paciencia"},
        {"name":"Champtercier","group":1, url: "http://www.anywhere.com", text: "Belleza"},
        {"name":"Cravatte","group":1, url: "http://www.anywhere.com", text: "Impaciencia"},
        {"name":"Count","group":1, url: "http://www.anywhere.com", text: "Las olas"},
        {"name":"OldMan","group":1, url: "http://www.anywhere.com", text: "Tituleque"},
        {"name":"Labarre","group":1, url: "http://www.anywhere.com", text: "Aislado"},
        // {"name":"Valjean","group":1, url: "http://www.anywhere.com", text: ""},
        // {"name":"Marguerite","group":1, url: "http://www.anywhere.com", text: ""},
        // {"name":"Mme.deR","group":1, url: "http://www.anywhere.com", text: ""},
        // {"name":"Isabeau","group":1, url: "http://www.anywhere.com", text: ""},
        // {"name":"Gervais","group":2},
        // {"name":"Tholomyes","group":3},
        // {"name":"Listolier","group":3},
        // {"name":"Fameuil","group":3},
        // {"name":"Blacheville","group":3},
    ],
    "links":[
        // {"source":1,"target":0,"value":1},
        // {"source":2,"target":0,"value":1},
        // {"source":3,"target":0,"value":1},
        // {"source":3,"target":2,"value":1},
        // {"source":4,"target":0,"value":1},
        // {"source":5,"target":0,"value":1},
        // {"source":6,"target":0,"value":1},
        // {"source":7,"target":0,"value":1},
        // {"source":8,"target":0,"value":1},
        // {"source":9,"target":0,"value":1},
        // {"source":11,"target":10,"value":1},
        // {"source":11,"target":3,"value":1},
    ]
}

//Creates the graph data structure out of the json data
force.nodes(graph.nodes)
  .links(graph.links)
  .start();

//Create all the line svgs but without locations yet
var link = svg.selectAll(".link")
  .data(graph.links)
  .enter().append("line")
  .attr("class", "link")
  .style("stroke-width", function (d) {
    return Math.sqrt(d.value);
  });

//Do the same with the circles for the nodes
var node = svg.selectAll(".node")
  .data(graph.nodes)
  .enter().append("g")
  .attr("class", "node")
  .call(force.drag);

node.append("circle")
  .attr("r", 10)
  .style("fill", function (d) {
    return color(d.group);

  })


// if it's a child, url it
node.each(function(d){
  var thisNode = d3.select(this);
  if (!d.children) {
    thisNode.append("svg:a")
      .attr("xlink:href", function(d) { return d.url; })
      .attr("target", "_blank")
      //.text(function(d) { return d.url; })
      .append("text")
        .on("click", function(){
          console.log(d.name);
        })
      .attr("dx", 8)
      .attr("dy", 3)
      .attr("text-anchor", "start")
      .text(function(d) { return d.text; });
  } else {
    thisNode.append("text")
      .attr("dx", -8)
      .attr("dy", 3)
      .attr("text-anchor", "end")
      .text(function(d) { return d.name; });
  }
});


// force be with you
force.on("tick", function () {
  // Constant movement
  force.alpha(0.1); 
  link.attr("x1", function (d) {
    return d.source.x;
  })
    .attr("y1", function (d) {
      return d.source.y;
    })
    .attr("x2", function (d) {
      return d.target.x;
    })
    .attr("y2", function (d) {
      return d.target.y;
    });

  //Changed

  d3.selectAll("circle").attr("cx", function (d) {
    return d.x;
  })
    .attr("cy", function (d) {
      return d.y;
    });

  d3.selectAll("text").attr("x", function (d) {
    return d.x * 1.01;
  })
    .attr("y", function (d) {
      return d.y;
    });
});