// append the svg object to the body of the page
var svgCities = d3.select("#colombia-cities-graph")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

var casesOrDeaths = "cases";
var perDayOrTotal = "per_day";
var city = "bogota";

// Read the data
d3.csv("data/cities/" + casesOrDeaths + "/" + perDayOrTotal + "/" + city + ".csv",

  // When reading the csv, I must format variables:
  (d) => {
    return { date : d3.timeParse("%Y-%m-%d")(d.date), cases : d.cases };
  },

  // Now I can use this dataset:
  (data) => {

    console.log(data);

    for (let date in data.cases) {
      console.log(date);
    }

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

    svgCities.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x)
      .tickFormat("")
      .tickSize(0));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, (d) => +d.cases )])
      .range([ height, 0 ]);

    svgCities.append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(y)
      .tickSize(-width)
      .tickFormat((d) => formatNum(d))
      .ticks(3));

    // text label for the x axis
    svgCities.append("text")             
      .attr("transform", "translate(" + (width / 2) + "," + (height + 20) + ")")
      .style("text-anchor", "middle")
      .attr("class" , "x-axis-label")
      .text("Date →");

    // Add the bars
    svgCities.append("g")
      .attr("fill", "steelblue")
      .selectAll("rect")
      .data(data)
      .enter()
        .append("rect")
        .attr("class" , "city-cpd-bar")
        .attr("x", d => x(d.date))
        .attr("y", d => y(d.cases))
        .attr("height", d => y(0) - y(d.cases))
        .attr("width", x.bandwidth());

    svgCities.selectAll(".city-cpd-bar")
      .on("mouseover", function (d) {
        d3.select(this).attr("opacity", 0.5);
        d3.select("#city-cpd-legend-text-cases")
          .text("Cases: " + formatNum(d.cases));
        d3.select("#city-cpd-legend-text-date")
          .text("Date: " + formatDate(d.date));
      });

    svgCities.selectAll(".city-cpd-bar")
      .on("mouseout", function () { 
        d3.select(this).attr("opacity", 1);
        d3.select("#city-cpd-legend-text-cases")
          .text("Cases:");
        d3.select("#city-cpd-legend-text-date")
          .text("Date:");
      });

    svgCities.append("rect")
      .attr("x", 65)
      .attr("y", 165)
      .attr("height", 45)
      .attr("width", 90)
      .attr("id", "city-cpd-legend")
      .style("opacity", 1)
      .style("fill", "#F5F5F5");

    svgCities.append("text")
      .attr("x", 75)
      .attr("y", 182)
      .attr("class", "city-cpd-legend-text")
      .attr("id", "city-cpd-legend-text-cases")
      .text("Cases: ");

    svgCities.append("text")
      .attr("x", 76)
      .attr("y", 198)
      .attr("class", "city-cpd-legend-text")
      .attr("id", "city-cpd-legend-text-date")
      .text("Date: ");
  }
);