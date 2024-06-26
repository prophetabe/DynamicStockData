// U81623325
function renderVisualization(data) {
    d3.select("#chart").selectAll("*").remove(); // Clear previous chart

    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    var svg = d3.select("#chart")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
              .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    var line = d3.line()
                 .x(function(d) { return x(d.Date); })
                 .y(function(d) { return y(d.Price); });

    x.domain(d3.extent(data, function(d) { return d.Date; }));
    y.domain(d3.extent(data, function(d) { return d.Price; }));

    svg.append("g")
       .attr("transform", "translate(0," + height + ")")
       .call(d3.axisBottom(x));

    svg.append("g")
       .call(d3.axisLeft(y));

    svg.append("path")
       .data([data])
       .attr("class", "line")
       .attr("d", line);

    var tooltip = d3.select("body").append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0);

    svg.selectAll("dot")
       .data(data)
       .enter().append("circle")
       .attr("r", 5)
       .attr("cx", function(d) { return x(d.Date); })
       .attr("cy", function(d) { return y(d.Price); })
       .on("mouseover", function(event, d) {
            tooltip.transition()
                   .duration(200)
                   .style("opacity", .9);
            tooltip.html("Stock: " + d.Stock + "<br/>Date: " + d.Date.toDateString() + "<br/>Price: " + d.Price)
                   .style("left", (event.pageX + 5) + "px")
                   .style("top", (event.pageY - 28) + "px");
        })
       .on("mouseout", function(d) {
            tooltip.transition()
                   .duration(500)
                   .style("opacity", 0);
        });
}
