var nations = [
  {
      "currNumCases" : 0,
      "currNumDeaths" : 0,
      "maxDayOfCases" : 0,
      "maxDayOfDeaths" : 0,
      "totalNumCases" : 0,
      "totalNumDeaths" : 0,
      "color" : "#60B93A",
      "label" : "Spain",
      "key" : "spain",
      "focusId" : "spain-focus",
      "hidden-ccl" : false,
      "hidden-cc" : false,
      "hidden-cd" : false,
      "hidden-cdl" : false
    },
    {
      "currNumCases" : 0,
      "currNumDeaths" : 0,
      "maxDayOfCases" : 0,
      "maxDayOfDeaths" : 0,
      "totalNumCases" : 0,
      "totalNumDeaths" : 0,
      "color" : "#2FC582",
      "label" : "Italy",
      "key" : "italy",
      "focusId" : "italy-focus",
      "hidden-ccl" : true,
      "hidden-cc" : true,
      "hidden-cd" : true,
      "hidden-cdl" : true
    },
    {
      "currNumCases" : 0,
      "currNumDeaths" : 0,
      "maxDayOfCases" : 0,
      "maxDayOfDeaths" : 0,
      "totalNumCases" : 0,
      "totalNumDeaths" : 0,
      "color" : "#2DB7D1",
      "label" : "Brazil",
      "key" : "brazil",
      "focusId" : "brazil-focus",
      "hidden-ccl" : true,
      "hidden-cc" : true,
      "hidden-cd" : true,
      "hidden-cdl" : true
    },
    {
      "currNumCases" : 0,
      "currNumDeaths" : 0,
      "maxDayOfCases" : 0,
      "maxDayOfDeaths" : 0,
      "totalNumCases" : 0,
      "totalNumDeaths" : 0,
      "color" : "#3A6EB7",
      "label" : "Peru",
      "key" : "peru",
      "focusId" : "peru-focus",
      "hidden-ccl" : false,
      "hidden-cc" : false,
      "hidden-cd" : false,
      "hidden-cdl" : false
    },
    {
      "currNumCases" : 0,
      "currNumDeaths" : 0,
      "maxDayOfCases" : 0,
      "maxDayOfDeaths" : 0,
      "totalNumCases" : 0,
      "totalNumDeaths" : 0,
      "color" : "#8F4390",
      "label" : "Ecuador",
      "key" : "ecuador",
      "focusId" : "ecuador-focus",
      "hidden-ccl" : true,
      "hidden-cc" : true,
      "hidden-cd" : true,
      "hidden-cdl" : true
    },
    {
      "currNumCases" : 0,
      "currNumDeaths" : 0,
      "maxDayOfCases" : 0,
      "maxDayOfDeaths" : 0,
      "totalNumCases" : 0,
      "totalNumDeaths" : 0,
      "color" : "#D23466",
      "label" : "Mexico",
      "key" : "mexico",
      "focusId" : "mexico-focus",
      "hidden-ccl" : false,
      "hidden-cc" : false,
      "hidden-cd" : false,
      "hidden-cdl" : false
    },
    {
      "currNumCases" : 0,
      "currNumDeaths" : 0,
      "maxDayOfCases" : 0,
      "maxDayOfDeaths" : 0,
      "totalNumCases" : 0,
      "totalNumDeaths" : 0,
      "color" : "#E73D36",
      "label" : "Chile",
      "key" : "chile",
      "focusId" : "chile-focus",
      "hidden-ccl" : false,
      "hidden-cc" : false,
      "hidden-cd" : false,
      "hidden-cdl" : false
    },
    {
      "currNumCases" : 0,
      "currNumDeaths" : 0,
      "maxDayOfCases" : 0,
      "maxDayOfDeaths" : 0,
      "totalNumCases" : 0,
      "totalNumDeaths" : 0,
      "color" : "#DFA41C",
      "label" : "Colombia",
      "key" : "colombia",
      "focusId" : "colombia-focus",
      "hidden-ccl" : false,
      "hidden-cc" : false,
      "hidden-cd" : false,
      "hidden-cdl" : false
    },
    {
      "currNumCases" : 0,
      "currNumDeaths" : 0,
      "maxDayOfCases" : 0,
      "maxDayOfDeaths" : 0,
      "totalNumCases" : 0,
      "totalNumDeaths" : 0,
      "color" : "#EC731F",
      "label" : "Argentina",
      "key" : "argentina",
      "focusId" : "argentina-focus",
      "hidden-ccl" : false,
      "hidden-cc" : false,
      "hidden-cd" : false,
      "hidden-cdl" : false
    },
    {
      "currNumCases" : 0,
      "currNumDeaths" : 0,
      "maxDayOfCases" : 0,
      "maxDayOfDeaths" : 0,
      "totalNumCases" : 0,
      "totalNumDeaths" : 0,
      "color" : "#9D7B3C",
      "label" : "Venezuela",
      "key" : "venezuela",
      "focusId" : "venezuela-focus",
      "hidden-ccl" : true,
      "hidden-cc" : true,
      "hidden-cd" : true,
      "hidden-cdl" : true
  }];

function establishData(data, casesOrDeaths = "deaths", initialEstablishment = false) {
  let maxDay = (casesOrDeaths == "cases") ? "maxDayOfCases" : "maxDayOfDeaths";

  for (let d of data) {
    // Day
    d.day = +d.day;
    // Spain
    d.spain = +d.Spain;
    if (d.Spain && initialEstablishment) nations[0][maxDay] += 1;
    // Italy
    d.italy = +d.Italy;
    if (d.Italy && initialEstablishment) nations[1][maxDay] += 1;
    // Brazil
    d.brazil = +d.Brazil;
    if (d.Brazil && initialEstablishment) nations[2][maxDay] += 1;
    // Peru
    d.peru = +d.Peru;
    if (d.Peru && initialEstablishment) nations[3][maxDay] += 1;
    // Ecuador
    d.ecuador = +d.Ecuador;
    if (d.Ecuador && initialEstablishment) nations[4][maxDay] += 1;
    // Mexico
    d.mexico = +d.Mexico;
    if (d.Mexico && initialEstablishment) nations[5][maxDay] += 1;
    // Chile
    d.chile = +d.Chile;
    if (d.Chile && initialEstablishment) nations[6][maxDay] += 1;
    // Colombia
    d.colombia = +d.Colombia;
    if (d.Colombia && initialEstablishment) nations[7][maxDay] += 1;
    // Argentina
    d.argentina = +d.Argentina;
    if (d.Argentina && initialEstablishment) nations[8][maxDay] += 1;
    // Venezuela
    d.venezuela = +d.Venezuela;
    if (d.Venezuela && initialEstablishment) nations[9][maxDay] += 1;
  }
}

function appendLine(nation, data, x, y, graph, svg) {
  let key = nation.key;
  let color = nation.color;
  let nationLine = d3.line()
    .x( (d) => x(d.day) )
    .y( (d) => y(d[key]) )
    .defined( (d) => d[key] );

  svg.append("path")
    .data([data])
    .attr("class", "line")
    .attr("id", graph + "-line-" + nation.label)
    .attr("class" , "nation-line")
    .style("stroke", color)
    .attr("d", nationLine);
}

function appendLabel(nation, x, y, graph, svg, catOfNum) {
  let maxDay = (catOfNum == "totalNumCases") ? nation.maxDayOfCases : nation.maxDayOfDeaths;
  let totalNum = nation[catOfNum];
  let label = nation.label;
  svg.append("text")
    .attr("transform", "translate(" + x(maxDay) + "," + y(totalNum) + ")")
    .attr("dx", "0.5em")
    .attr("dy", ".35em")
    .attr("text-anchor", "start")
    .attr("id", graph + "-label-" + label)
    .attr("class", "label-text")
    .style("fill", nation.color)
    .style("font", "12px Arial")
    .text(label);
}

function appendFocus(nation, graph, svg) {
  let color = nation.color;
  let focusId = nation.focusId;
  svg.append("circle")
      .style("fill", nation.color)
      .style("opacity", 0)
      .attr("r", 2.5)
      .attr("id", graph + "-" + focusId)
      .attr("class", graph + "-focus-point");
}

function appendLegend(graph, svg) {
  svg.append("rect")
    .attr("transform", "translate(" + 34 + "," + 5 + ")")
    .attr("id", graph + "-legend-rect")
    .style("opacity", 0)
    .style("fill", "#F5F5F5");

  svg.append('g')
  .attr("transform", "translate(" + 50 + "," + -25 + ")")
  .attr("id", graph + "-legend-g")
  .style("font-size", "0.7em");

  let legendGroup = d3.select("#" + graph + "-legend-g");

  legendGroup.append("text")
    .attr("id", graph + "-legend-day")
    .attr("y", 50)
    .attr("class", graph + "-legend-text");
}

function formatNum(num) {
  var formatted = num.toString();
  return formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function toggleNationHide(nation, graph) {
  let hidden = "hidden-" + graph;
  nation[hidden] = !nation[hidden];
}

function checkboxClick(label, key, graph) {
  let id = key + "-input-" + graph;
  let totalNum = (graph == "cc" || graph == "ccl") ? "totalNumCases" : "totalNumDeaths";
  let totalNumDays = (graph == "cc" || graph == "ccl") ? "maxDayOfCases" : "maxDayOfDeaths";
  let file = (graph == "cc" || graph == "ccl") ? "data/countries_progression.csv" : "data/countries_death_progression.csv";
  let typeOfData = (graph == "cc" || graph == "ccl") ? "cases" : "deaths";
  var disable = !document.getElementById(id).checked;
  let [maxValue, secondMaxValue] = findMaxValuesNation(graph, totalNum);
  let [X, Y] = determineXYVariable(graph);
  let svg = setSVG(graph);
  if (disable) {
    disableCountry(graph, key, file, typeOfData, label, totalNum, maxValue, totalNumDays, secondMaxValue, X, Y);
  } else {
    enableCountry(graph, file, typeOfData, label, totalNum, maxValue, totalNumDays, X, Y, svg);
  }
}

function disableCountry(graph, key, file, typeOfData, label, totalNum, maxValue, totalNumDays, secondMaxValue, X, Y) {
  d3.select("#" + graph + "-line-" + label).remove();
  d3.select("#" + graph + "-label-" + label).remove();
  d3.select("#" + graph + "-" + key + "-focus").remove();
  for (let nation of nations) {
    if (nation.label == label) {
      toggleNationHide(nation, graph);
      if (nation[totalNum] == maxValue) {
        Y = transitionYAxis(Y, secondMaxValue, graph);
        setY(graph, Y);
        d3.csv(file, (data) => {
          establishData(data, typeOfData);
          let maxNumDays = nations[0][totalNumDays];
          transitionLinesAndLabels(data, X, Y, graph, totalNum, maxNumDays);
        });
      }
      break;
    }
  }
}

function enableCountry(graph, file, typeOfData, label, totalNum, maxValue, totalNumDays, X, Y, svg) {
  for (let nation of nations) {
    if (nation.label == label) {
      toggleNationHide(nation, graph);
      d3.csv(file, (data) => {
        establishData(data, typeOfData);
        if (nation[totalNum] > maxValue) {
          Y = transitionYAxis(Y, nation[totalNum], graph);
          let maxNumDays = nations[0][totalNumDays];
          setY(graph, Y);
          transitionLinesAndLabels(data, X, Y, graph, totalNum, maxNumDays);
        }
        appendLine(nation, data, X, Y, graph, svg);
        appendLabel(nation, X, Y, graph, svg, totalNum);
        appendFocus(nation, graph, svg);
      });
      break;
    }
  }
}

function setSVG(graph) {
  let svg = null;
  switch (graph) {
    case "cc":
      svg = svgCC;
      break;
    case "ccl":
      svg = svgCCL;
      break;
    case "cd":
      svg = svgCD;
      break;
    case "cdl":
      svg = svgCDL;
      break;
  }
  return svg;
}

function determineXYVariable(graph) {
  let [X, Y] = [null, null];
  switch (graph) {
    case "cc":
      X = ccX;
      Y = ccY;
      break;
    case "ccl":
      X = cclX;
      Y = cclY;
      break;
    case "cd":
      X = cdX;
      Y = cdY;
      break;
    case "cdl":
      X = cdlX;
      Y = cdlY;
  }
  return [X, Y];
}

function setY(graph, y) {
  switch (graph) {
    case "cc":
      ccY = y;
      break;
    case "ccl":
      cclY = y;
      break;
    case "cd":
      cdY = y;
      break;
    case "cdl":
      cdlY = y;
      break;
  }
}

function transitionLinesAndLabels(data, x, y, graph, totalNum, maxNumDays) {
  let greyLimit = 0;
  let maxDay = (graph == "cc" || graph == "ccl") ? "maxDayOfCases" : "maxDayOfDeaths";
  for (let nation of nations) {
    let hidden = "hidden-" + graph;
    if (nation[hidden]) continue;
    if (greyLimit < nation[totalNum]) greyLimit = nation[totalNum] * 2;
    let key = nation.key;
    let word = "#" + graph + "-line-" + nation.label;
    let nationLine = d3.line()
      .x( (d) => x(d.day) )
      .y( (d) => y(d[key]) )
      .defined( (d) => d[key] );
    d3.select("#" + graph + "-line-" + nation.label)
      .transition()
      .attr("d", nationLine);
    d3.select("#" + graph + "-label-" + nation.label)
      .transition()
      .attr("transform", "translate(" + x(nation[maxDay]) + "," + y(nation[totalNum]) + ")");
  }
  applyDuplicationLines(graph, x, y, greyLimit, maxNumDays);
}

function applyDuplicationLines(graph, x, y, greyLimit, maxNumDays) {
  let slice = d3.line()
      .x( (d) => x(d.x) )
      .y( (d) => y(d.y) );
  for (rateOfD = 4; rateOfD < 9; rateOfD++) {
    let duplicationLine = [];
    let yValue = 1;
    for (xValue = 1; xValue <= maxNumDays; xValue += rateOfD) {
      if (yValue >= greyLimit * 2) break;
      duplicationLine.push({x: xValue, y: yValue});
      yValue *= 2;
    }
    d3.select("#" + graph + "-duplication-line-" + rateOfD)
      .attr("d", slice(duplicationLine));
  }
}

function transitionYAxis(y, maxDomainValue, graph) {
  switch (graph) {
    case "cc":
    case "cd":
      y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, maxDomainValue]);
      break;
    case "ccl":
    case "cdl":
      y = d3.scaleLog()
        .range([height, 1])
        .base(10)
        .domain([1, maxDomainValue]);
      break;
  }
  d3.select("#" + graph + "-y-axis-cases")
    .transition()
    .call(d3.axisLeft(y)
      .tickFormat((d) => formatNum(d))
      .ticks(3)
      .tickSize(-width));
  return y;
}

function findMaxValuesNation(graph, totalNum) {
  let maxValue = 0;
  let secondMaxValue = 0;
  for (let nation of nations) {
    let hidden = "hidden-" + graph;
    if (nation[hidden]) continue;
    if (nation[totalNum] >= maxValue) {
      secondMaxValue = maxValue;
      maxValue = nation[totalNum];
    }
    if (nation[totalNum] > secondMaxValue && nation[totalNum] != maxValue) {
      secondMaxValue = nation[totalNum];
    }
  }
  return [maxValue, secondMaxValue];
}

function establishInitialNum(i, firstMouseOver, data, catOfNum) {
  let currNum = (catOfNum == "totalNumCases") ? "currNumCases" : "currNumDeaths";
  let maxDayType = (catOfNum == "totalNumCases") ? "maxDayOfCases" : "maxDayOfDeaths";
  firstMouseOver = false;
  for (let nation of nations) {
    let label = nation.label;
    let maxDay = nation[maxDayType];
    let totalNum = nation[catOfNum];
    nation[currNum] = parseInt((data[i].day < maxDay) ? data[i][label] : totalNum); 
  }
  return firstMouseOver;
}

function updateCurrNum(i, data, graph, catOfNum) {
  let currNum = (catOfNum == "totalNumCases") ? "currNumCases" : "currNumDeaths";
  let maxDayType = (catOfNum == "totalNumCases") ? "maxDayOfCases" : "maxDayOfDeaths";
  for (let nation of nations) {
    if (nation[graph] == true) continue;
    let label = nation.label;
    let maxDay = nation[maxDayType];
    let totalNum = nation[catOfNum];
    let value = parseInt((data[i].day < maxDay) ? data[i][label] : totalNum);
    nation[currNum] = value;
    
  }
}

function appendLinesFocusesLabels(x, y, graph, svg, casesOrDeaths) {
  let file = (casesOrDeaths == "cases") ? "data/countries_progression.csv" : "data/countries_death_progression.csv";
  let totalNum = (casesOrDeaths == "cases") ? "totalNumCases" : "totalNumDeaths";
  for (let nation of nations) {
    if (nation["hidden-cc"] == true) continue;
    d3.csv(file, (data) => {
      establishData(data);
      appendLine(nation, data, x, y, graph, svg);
    });
    appendLabel(nation, x, y, graph, svg, totalNum);
    appendFocus(nation, graph, svg);
  }
}

function appendDuplicationLines(x, y, graph, svg, greyLimit) {
  let slice = d3.line()
    .x( (d) => x(d.x) )
    .y( (d) => y(d.y) );
  for (rateOfD = 4; rateOfD < 9; rateOfD++) {
    let duplicationLine = [];
    let yValue = 1;
    for (xValue = 1; xValue <= maxNumDays; xValue += rateOfD) {
      duplicationLine.push({x: xValue, y: yValue});
      if (yValue >= greyLimit) break;
      yValue *= 2;
    }
    svg.append("path")
      .attr("class", "duplication-line")
      .attr("id" , graph + "-duplication-line-" + rateOfD)
      .data(duplicationLine)
      .style("stroke-dasharray", ("3, 3"))
      .attr("d", slice(duplicationLine))
      .style("fill", "none")
      .style("opacity", "0.3")
      .style("stroke", "grey")
      .style("stroke-width", 1);
  }
}