// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svgCDL = d3.select("#comparison-deaths-log-div").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

var maxNumDays = 0;
// Comparison Cases X
var cdlX = 0;
// Comparison Cases Y
var cdlY = 0;

d3.csv("data/countries_death_progression.csv", (data) => {

  establishData(data, "deaths");

  maxNumDays = nations[1].maxDayOfDeaths;
  var maxNumDeaths = 0;
  var firstMouseOver = true;
  var graph = "cdl";

  // Setting the totalNumDeaths for each nation in the dictionary
  for (let nation of nations) {
    let maxDay = nation.maxDayOfDeaths;
    let label = nation.label;
    nation.totalNumDeaths = parseInt(data[maxDay - 1][label]);
    if (nation["hidden-cdl"] == true) continue;
    if (nation.totalNumDeaths > maxNumDeaths) maxNumDeaths = nation.totalNumDeaths;
  }

  // This allows to find the closest X index of the mouse:
  var bisect = d3.bisector( (d) => d.day ).left;
  var currDay = null;

  function mouseover() {
    d3.select("#" + graph + "-legend-rect").style("opacity", 1);
    d3.select("#" + graph + "-legend-day").style("opacity", 1);
    d3.selectAll("." + graph + "-focus-point").style("opacity", 1);
    d3.selectAll("." + graph + "-legend-point").style("opacity", 1);
    d3.selectAll("." + graph + "-legend-text").style("opacity", 1);
  }

  function mousemove() {
    let x0 = cdlX.invert(d3.mouse(this)[0]);
    let i = bisect(data, x0, 1) - 1;

    // Populate the currNumCases field on the first mouseover
    if (firstMouseOver) {
      firstMouseOver = establishInitialNum(i, firstMouseOver, data, "totalNumDeaths");
    }

    // Spare unnecessary work on the browser
    if (currDay == data[i].day) return;
    currDay = data[i].day;

    updateCurrNum(i, data, "hidden-cdl", "totalNumDeaths");

    nations.sort((a, b) => b.currNumDeaths - a.currNumDeaths);
    d3.selectAll("." + graph + "-legend-text-nations").remove();
    d3.selectAll("." + graph + "-legend-point").remove();
    let legendGroup = d3.select("#" + graph + "-legend-g");
    let dy = 0;

    for (let nation of nations) {
      if (nation["hidden-cdl"] == true) continue;
      dy += 1;
      let key = nation.key;
      let label = nation.label;
      let focusId = nation.focusId;
      let maxDay = nation.maxDayOfDeaths;
      let totalNumDeaths = nation.totalNumDeaths;
      let color = nation.color;
      let value = parseInt((data[i].day < maxDay) ? data[i][label] : totalNumDeaths);

      d3.select("#" + graph + "-" + focusId)
        .attr("cx", () => (data[i].day < maxDay) ? cdlX(data[i].day) : (cdlX(maxDay)) )
        .attr("cy", () => (data[i].day < maxDay) ? cdlY(data[i][label]) : (cdlY(totalNumDeaths)) );
      d3.select("#" + graph + "-legend-day")
        .text("Day: " + data[i].day)
        .style("fill", "#383838");

      legendGroup
        .append("circle")
          .style("fill", color)
          .attr("r", 3)
          .attr("cy", 46 + (15 * dy))
          .attr("class", graph + "-legend-point");
      legendGroup
        .append("text")
          .attr("id", graph + "-legend-text-" + label)
          .attr("y", 50 + (15 * dy))
          .attr("x", 7)
          .attr("class", graph + "-legend-text " + graph + "-legend-text-nations")
          .attr("fill", "#383838")
          .text(label + ": " + formatNum(value));

      d3.select("#" + graph + "-legend-rect")
        .attr("width", d3.select("#" + graph + "-legend-g").node().getBBox().width + 30)
        .attr("height", d3.select("#" + graph + "-legend-g").node().getBBox().height + 20);
    }
  } 

  function mouseout() {
    d3.select("#" + graph + "-legend-day").style("opacity", 0);
    d3.selectAll("." + graph + "-focus-point").style("opacity", 0);
    d3.selectAll("." + graph + "-legend-point").style("opacity", 0);
    d3.selectAll("." + graph + "-legend-text").style("opacity", 0);
    d3.select("#" + graph + "-legend-rect").style("opacity", 0);
  }

  cdlX = d3.scaleLinear()
    .domain([1, maxNumDays])
    .range([ 0, width ]);

  cdlY = d3.scaleLog()
    .range([height, 1])
    .base(10)
    .domain([1, maxNumDeaths]);

  // Append the rates of duplication lines
  appendDuplicationLines(cdlX, cdlY, graph, svgCDL, maxNumDeaths);

  // Add the X Axis
  svgCDL.append("g")
    .attr("class", "grid")
    .attr("id", graph + "-x-axis-cases")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(cdlX)
      .ticks(5));

  // Add the Y Axis
  svgCDL.append("g")
    .attr("class", "grid")
    .attr("id", graph + "-y-axis-cases")
    .call(d3.axisLeft(cdlY)
      .tickFormat((d) => formatNum(d))
      .ticks(3)
      .tickSize(-width));

  // Append the nations' lines, focuses & labels
  appendLinesFocusesLabels(cdlX, cdlY, graph, svgCDL, "deaths");
  
   // Append the legend
  appendLegend(graph, svgCDL);

  // Create a rect on top of the svg area: this rectangle recovers mouse position
  svgCDL.append('rect')
    .style("fill", "none")
    .style("pointer-events", "all")
    .attr('width', width)
    .attr('height', height)
    .on('mouseover', mouseover)
    .on('mousemove', mousemove)
    .on('mouseout', mouseout);
});