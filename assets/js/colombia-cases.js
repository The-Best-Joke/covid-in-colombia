// append the svg object to the body of the page
var svgCOLC = d3.select("#colombia-cases-div")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Read the data
d3.csv("data/total_cases_per_day.csv",

  // When reading the csv, I must format variables:
  (d) => {
    return { date : d3.timeParse("%m/%d/%Y")(d.date), cases : d.cases };
  },

  // Now I can use this dataset:
  (data) => {

    // What happens when the mouse move -> show the annotations at the right positions.
    function mouseover() {
      focus.style("opacity", 1);
      focusCases.style("opacity", 1);
      focusDate.style("opacity", 1);
    }

    function mousemove() {
      // recover coordinate we need
      var x0 = x.invert(d3.mouse(this)[0]);
      var i = bisect(data, x0, 1);
      selectedData = data[i];
      selectedMonth = selectedData.date.getMonth() + 1;
      focus
        .attr("cx", x(selectedData.date))
        .attr("cy", y(selectedData.cases));
      focusCases
        .attr("x", x(selectedData.date) - 25)
        .attr("y", y(selectedData.cases) - 15)
        .html("Cases: " + formatNum(selectedData.cases));
      focusDate
        .attr("x", x(selectedData.date) - 25)
        .attr("y", y(selectedData.cases) - 30)
        .html("Date: " + selectedData.date.getDate() + "/" + selectedMonth + "/" + selectedData.date.getFullYear());
        } 

    function mouseout() {
      focus.style("opacity", 0);
      focusCases.style("opacity", 0);
      focusDate.style("opacity", 0);
    }

    function formatDate(d) {
      date = d.getDate();
      month = d.getMonth() + 1;
      year = d.getFullYear();
      return date + "/" + month + "/" + year;
    }

    // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(data, (d) => d.date ))
      .range([ 0, width ]);

    svgCOLC.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x)
        .tickFormat((d) => formatDate(d))
        .ticks(3));


    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => +d.cases )])
      .range([ height, 0 ]);

    svgCOLC.append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(y)
        .tickSize(-width)
        .tickFormat((d) => formatNum(d))
        .ticks(2));

    // Add the line
    svgCOLC.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin","round")
      .attr("d", d3.line()
        .x( (d) => x(d.date) )
        .y( (d) => y(d.cases) )
        );

    // This allows to find the closest X index of the mouse:
    var bisect = d3.bisector( (d) => d.date ).left;

    // Create the circle that travels along the curve of chart
    var focus = svgCOLC
      .append("circle")
        .style("fill", "none")
        .attr("stroke", "black")
        .attr("r", 5.5)
        .style("opacity", 0);

    // Create the text that travels along the curve of chart
    var focusCases = svgCOLC
      .append("text")
        .attr("class", "focus-text");

    // Create the text that travels along the curve of chart
    var focusDate = svgCOLC
      .append("text")
        .attr("class", "focus-text");

    // Create a rect on top of the svg area: this rectangle recovers mouse position
    svgCOLC
      .append('rect')
      .style("fill", "none")
      .style("pointer-events", "all")
      .attr('width', width)
      .attr('height', height)
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseout', mouseout);
  }
);