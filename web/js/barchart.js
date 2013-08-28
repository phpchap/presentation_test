//var data = [8, 12, 15, 30, 43];
//var w = 20,
//h = 50;
//  
//var x = d3
//.scale
//.linear()
//.domain([0, 1])
//.range([0, w]);
//     
//var y = d3
//.scale
//.linear()
//.domain([0, 50])
//.rangeRound([0, h]); //rangeRound is used for antialiasing
//     
//var chart = d3.select(".charts").append("svg")
//.attr("class", "chart")
//.attr("width", w * data.length)
//.attr("height", h);
//  
//// width is the width of the bar
//// height is the height of the bar
//// x and y are the position of the bar
//// for crips edges use -.5 (antialiasing)
//chart.selectAll("rect")
//    .data(data)
//    .enter().append("rect")
//    .attr("x", function(d, i) {
//        return x(i) - .5;
//    })
//    .attr("y", function(d) {
//        return h - y(d) - .5;
//    })
//    .attr("width", w)
//    .attr("height", function(d) {
//        return y(d);
//    } );
//
//chart.append("line")
//    .attr("x1", 0)
//    .attr("x2", w * data.length)
//    .attr("y1", h - .5)
//    .attr("y2", h - .5)
//    .style("stroke", "#000");
//     
//function redraw() {
//    chart.selectAll("rect")
//    .data(data)
//    .transition()
//    .duration(1000)
//    .attr("y", function(d) {
//        return h - y(d) - .5;
//    })
//    .attr("height", function(d) {
//        return y(d);
//    } );  
//}
//  
//d3.select("#example1 button").on("click", function() {
//    data[2] = 49;
//    redraw();
//});
//

var data = [{"number":1, "value":8},{"number":2, "value":16},{"number":3, "value":32},{"number":4, "value":64}];
var w = 260;
var h = 330;
var x = d3.scale.linear()
  .domain([0, d3.max(data, function(d) { return d.value; })])
  .range([0, w]);
var y = d3.scale.ordinal()
  .domain(d3.range(data.length))
  .rangeBands([0, h], 0.1);
var color = d3.scale.ordinal()
  .range(["red", "blue"]);

//initial svg creation
var svg = d3.select("#test-chart")
  .append("svg")
    .attr("width", 815 + 40)
    .attr("height", h + 20)
  .append("g")
    .attr("transform", "translate(20,0)");

//bars
var bars = svg.selectAll(".bar")
    .data(data)
  .enter().append("g")
    .attr("class", "bar")
    .attr("transform", function(d, i) { return "translate(" + 0 + "," + y(i+1) + ")"; });
//bar rectangles
bars.append("rect")
  .attr("fill", function(d, i) { return color(i%2); })
  .attr("width", function(d) { return x(d.value); })
  .attr("height", y.rangeBand());
//bar labels
bars.append("text")
  .attr("x", function(d) { return x(d.value); })
  .attr("y", 0 + y.rangeBand() / 2)
  .attr("dx", -6)
  .attr("dy", ".35em")
  .attr("text-anchor", "end")
  .text(function(d) { return d.value; });

//button press
$("#transition").click(function(event) {
//  //ajax calls
//  var req = $.ajax({
//    url: '/models/',
//    type: 'GET',
//    dataType: 'json',
//    success: function(response) {
//      data = response;
//    }
//  });
//  //update d3 charts after ajax call complete
//  $.when(req).done(function() {
    data = [];
    for(var i = 0; i < 4; i++) {
      data.push({"number":i, "value": Math.floor(Math.random()*64)});
    }
    var rect = svg.selectAll(".bar rect").data(data);
    var text = svg.selectAll(".bar text").data(data);
    var delay = function(d, i) { return i * 50; };
    rect.transition().duration(750)
      .delay(delay)
      .attr("width", function(d) { return x(d.value); });
    text.transition().duration(750)
      .delay(delay)
      .attr("x", function(d) { return x(d.value); })
      .text(function(d) { return d.value; });
//  });
});