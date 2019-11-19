var margin = {top: 100, right: 10, bottom: 40, left: 90},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


var svg = d3.select('svg')
    .append('svg')
        .attr('class', 'bar-chart')
        .attr('width', 480)
        .attr("height", 500)
    .append("g")
        .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


d3.csv("data.csv").then(function(data)  {
    // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 1500000])
    .range([ 0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

  // Y axis
  var y = d3.scaleBand()
    .range([ 0, height ])
    .domain(data.map(function(d) { return d.country; }))
    .padding(.1);
  svg.append("g")
    .call(d3.axisLeft(y));

  //Bars
   svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
            .attr("x", x(0) )
            .attr("y", function(d) { return y(d.country); })
            .attr("width", function(d) { return x(d.population); })
            .attr("height", y.bandwidth() )
            .attr("fill", "#69b3a2")

   //Headlines
   svg.append("text")
         .attr("x", 150)
         .attr("y", -20)
         .attr("text-anchor", "middle")
         .text("Population of country in 2017 ")

});