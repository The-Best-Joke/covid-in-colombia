// append the svg object to the body of the page
var svgCOLDPD = d3.select("#colombia-deaths-per-day-div")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Read the data
d3.csv("data/deaths_per_day.csv",

  // When reading the csv, I must format variables:
  (d) => {
    return { date : d3.timeParse("%m/%d/%Y")(d.date), deaths : d.deaths };
  },

  // Now I can use this dataset:
  (data) => {

    function formatDate(d) {
      date = d.getDate();
      month = d.getMonth() + 1;
      year = d.getFullYear();
      return date + "/" + month + "/" + year;
    }

    // Add X axis --> it is a date format
    var x = d3.scaleBand()
      .domain(data.map((d) => d.date ))
      .range([ 0, width ])
      .padding(0);

    svgCOLDPD.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x)
      .tickFormat("")
      .tickSize(0));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => +d.deaths )])
      .range([ height, 0 ]);

    svgCOLDPD.append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(y)
      .tickSize(-width)
      .tickFormat((d) => formatNum(d))
      .ticks(3));

    // text label for the x axis
    svgCOLDPD.append("text")             
      .attr("transform", "translate(" + (width / 2) + "," + (height + 20) + ")")
      .style("text-anchor", "middle")
      .attr("class" , "x-axis-label")
      .text("Date →");

    // Add the bars
    svgCOLDPD.append("g")
      .attr("fill", "#B00020")
      .selectAll("rect")
      .data(data)
      .enter()
        .append("rect")
        .attr("class" , "ccpd-bar")
        .attr("x", d => x(d.date))
        .attr("y", d => y(d.deaths))
        .attr("height", d => y(0) - y(d.deaths))
        .attr("width", x.bandwidth());

    svgCOLDPD.selectAll(".ccpd-bar")
      .on("mouseover", function (d) {
        d3.select(this).attr("opacity", 0.5);
        d3.select("#cdpd-legend-text-deaths")
          .text("Deaths: " + formatNum(d.deaths));
        d3.select("#cdpd-legend-text-date")
          .text("Date: " + formatDate(d.date));
      });

    svgCOLDPD.selectAll(".ccpd-bar")
      .on("mouseout", function () { 
        d3.select(this).attr("opacity", 1);
        d3.select("#cdpd-legend-text-deaths")
          .text("Deaths:");
        d3.select("#cdpd-legend-text-date")
          .text("Date:");
      });

    svgCOLDPD.append("rect")
      .attr("x", 65)
      .attr("y", 145)
      .attr("height", 45)
      .attr("width", 90)
      .attr("id", "cdpd-legend")
      .style("opacity", 1)
      .style("fill", "#F5F5F5");

    svgCOLDPD.append("text")
      .attr("x", 75)
      .attr("y", 162)
      .attr("class", "cpd-legend-text")
      .attr("id", "cdpd-legend-text-deaths")
      .text("Deaths: ");

    svgCOLDPD.append("text")
      .attr("x", 75)
      .attr("y", 178)
      .attr("class", "cpd-legend-text")
      .attr("id", "cdpd-legend-text-date")
      .text("Date: ");
  }
);