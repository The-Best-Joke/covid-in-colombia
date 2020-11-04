// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svgCC = d3.select("#comparison-cases-div").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

var maxNumDays = 0;
// Comparison Cases X
var ccX = 0;
// Comparison Cases Y
var ccY = 0;

d3.csv("data/countries_progression.csv", (data) => {

  establishData(data, "cases", true);

  maxNumDays = nations[1].maxDayOfCases;
  var maxNumCases = 0;
  var firstMouseOver = true;
  var graph = "cc";

  // Setting the totalNumCases for each nation in the dictionary
  for (let nation of nations) {
    let maxDay = nation.maxDayOfCases;
    let label = nation.label;
    nation.totalNumCases = parseInt(data[maxDay - 1][label]);
    if (nation["hidden-cc"] == true) continue;
    if (nation.totalNumCases > maxNumCases) maxNumCases = nation.totalNumCases;
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
    let x0 = ccX.invert(d3.mouse(this)[0]);
    let i = bisect(data, x0, 1) - 1;

    // Populate the currNumCases field on the first mouseover
    if (firstMouseOver) {
      firstMouseOver = establishInitialNum(i, firstMouseOver, data, "totalNumCases");
    }

    // Spare unnecessary work on the browser
    if (currDay == data[i].day) return;
    currDay = data[i].day;

    updateCurrNum(i, data, "hidden-cc", "totalNumCases");

    nations.sort((a, b) => b.currNumCases - a.currNumCases);
    d3.selectAll("." + graph + "-legend-text-nations").remove();
    d3.selectAll("." + graph + "-legend-point").remove();
    let legendGroup = d3.select("#" + graph + "-legend-g");
    let dy = 0;

    for (let nation of nations) {
      if (nation["hidden-cc"] == true) continue;
      dy += 1;
      let key = nation.key;
      let label = nation.label;
      let focusId = nation.focusId;
      let maxDay = nation.maxDayOfCases;
      let totalNumCases = nation.totalNumCases;
      let color = nation.color;
      let value = parseInt((data[i].day < maxDay) ? data[i][label] : totalNumCases);

      d3.select("#" + graph + "-" + focusId)
        .attr("cx", () => (data[i].day < maxDay) ? ccX(data[i].day) : (ccX(maxDay)) )
        .attr("cy", () => (data[i].day < maxDay) ? ccY(data[i][label]) : (ccY(totalNumCases)) );
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

  ccX = d3.scaleLinear()
    .domain([1, maxNumDays])
    .range([ 0, width ]);

  ccY = d3.scaleLinear()
    .range([height, 0])
    .domain([0, maxNumCases]);

  // Append the rates of duplication lines
  appendDuplicationLines(ccX, ccY, graph, svgCC, maxNumCases);

  // Add the X Axis
  svgCC.append("g")
    .attr("class", "grid")
    .attr("id", graph + "-x-axis-cases")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(ccX)
      .ticks(5));

  // Add the Y Axis
  svgCC.append("g")
    .attr("class", "grid")
    .attr("id", graph + "-y-axis-cases")
    .call(d3.axisLeft(ccY)
      .tickFormat((d) => formatNum(d))
      .ticks(3)
      .tickSize(-width));

  // Append the nations' lines, focuses & labels
  appendLinesFocusesLabels(ccX, ccY, graph, svgCC, "cases");
  
   // Append the legend
  appendLegend(graph, svgCC);

  // Create a rect on top of the svg area: this rectangle recovers mouse position
  svgCC.append('rect')
    .style("fill", "none")
    .style("pointer-events", "all")
    .attr('width', width)
    .attr('height', height)
    .on('mouseover', mouseover)
    .on('mousemove', mousemove)
    .on('mouseout', mouseout);
});