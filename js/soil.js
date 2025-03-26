function createSoilTernaryPlot() {
  // setup grid for plot and tooltip
  const ternaryContainer = d3.select("#soil-ternary-container")
    .style("display", "grid")
    .style("grid-template-columns", "702px 70px 300px")
    .style("grid-template-areas", `"ternaryPlot helpButton ternaryTooltip"`)
    .style("margin", "30px");

  // Add help button
  let helpTooltipClicked = false;
  const helpTooltipButton = ternaryContainer.append("div")
    .attr("id", "helpButton")
    .style("grid-area", "helpButton")
    .style("height", "35px")
    .style("width", "35px")
    .style("font-size", '28px')
    .style("padding-left", "6px")
    .style("padding-left", "13px")
    .style("padding-bottom", "4px")
    .style("margin-top", "630px")
    .style("margin-left", "5px")
    .style("text-align", "left")
    .style("border", "2px solid #999")
    .style("border-radius", "8px")
    .style("color", "#777")
    .html("�")
    .on("mouseover", () => {
      d3.select("#helpButton").transition().duration(300)
        .style("border-color", "black");
      if (!helpTooltipClicked) {
        d3.select("#helpTooltip").transition().duration(500)
          .style("opacity", 1);
      }
    })
    .on("mouseout", () => {
      d3.select("#helpButton").transition().duration(300)
        .style("border-color", "#999");
      if (!helpTooltipClicked) {
        d3.select("#helpTooltip").transition().duration(500)
          .style("opacity", 0);
      }
    })
    .on("click", () => {
      helpTooltipClicked = !helpTooltipClicked;
      if (helpTooltipClicked) {
        d3.select("#helpTooltip").transition().duration(500)
          .style("opacity", 1);
        d3.select("#helpButton").transition().duration(300)
          .style("background-color", "#ddffdd");
      } else {
        d3.select("#helpTooltip").transition().duration(500)
          .style("opacity", 0);
        d3.select("#helpButton").transition().duration(300)
          .style("background-color", "#fff");
      }
    });

  // setup tooltip
  const tooltipContainer = ternaryContainer.append("div")
    .style("grid-area", "ternaryTooltip")
    .style("width", "240px")
    .style("height", "140px")
    .style("background-color", "black")
    .style("border", "1px solid black")
    .style("border-radius", "5px")
    .style("margin-top", "10px");

  const tooltip = tooltipContainer.append("div")
    .style("width", "219.5px")
    .style("height", "126px")
    .style("border-top-right-radius", "4px")
    .style("border-bottom-right-radius", "4px")
    .style("margin", "0px")
    .style("margin-left", "6px")
    .style("background-color", "#fffdfd")
    .style("border-left", "1px solid black")
    .style("font-size", "18px")
    .style("line-height", "24px")
    .style("padding", "7px");

  // Add help tooltip
  const helpTooltip = tooltipContainer.append("div")
    .attr("id", "helpTooltip")
    .style("padding", "10px")
    .style("border", "1px solid black")
    .style("border-radius", "3px")
    .style("font-size", "18px")
    .style("line-height", "24px")
    .style("margin-top", "20px")
    .style("width", "400px")
    .style("opacity", 0)
    .html("This is a ternary plot showing the composition of the USDA's soil texture classifications.<br><br><b>Sand:</b> 0.05mm-2.0mm in diameter<br><b>Silt:</b> 0.002-0.05mm in diameter<br><b>Clay: </b>\<0.002mm in diameter<br><br><b>Features:</b><br><ul><li>Hover over a region to see composition details in the tooltip above</li><li>Click on a region to view all methods using the selected soil type as a matrix</li></ul>");

  const svgContainer = ternaryContainer.append("div")
    .style("grid-area", "ternaryPlot")
    .style("padding", "5px")
    .style("border", "3px solid black")
    .style("border-radius", "7px")
    .style("background-color", "#ddd")
    .style("width", "702px")
    .style("height", "672px");

  // Set up dimensions and margins
  const width = 600;
  const height = 600;
  const margin = { top: 50, right: 50, bottom: 20, left: 50 };

  // Create SVG element
  const svg = svgContainer.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("border", "1px solid black")
    .style("background-color", "white")
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Define scales
  const scale = d3.scaleLinear().domain([0, 100]).range([0, width]);

  const THIRTY_DEGREES = Math.sqrt(3) / 2;

  // Draw the ternary plot axes
  svg.append("line")
    .attr("x1", scale(50))
    .attr("y1", scale(0))
    .attr("x2", scale(100))
    .attr("y2", scale(100 * THIRTY_DEGREES))
    .attr("stroke", "black");

  svg.append("line")
    .attr("x1", scale(50))
    .attr("y1", scale(0))
    .attr("x2", scale(0))
    .attr("y2", scale(100 * THIRTY_DEGREES))
    .attr("stroke", "black");

  svg.append("line")
    .attr("x1", scale(0))
    .attr("y1", scale(100 * THIRTY_DEGREES))
    .attr("x2", scale(100))
    .attr("y2", scale(100 * THIRTY_DEGREES))
    .attr("stroke", "black");

  // Add axes labels
  svg.append("text")
    .attr("x", scale(20))
    .attr("y", scale(40))
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .text("Clay (%)")
    .attr("transform", `rotate(-60, ${scale(20)}, ${scale(45)})`);

  svg.append("text")
    .attr("x", scale(80))
    .attr("y", scale(40))
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .text("Silt (%)")
    .attr("transform", `rotate(60, ${scale(80)}, ${scale(45)})`);

  svg.append("text")
    .attr("x", scale(50))
    .attr("y", scale(100 * Math.sqrt(3) / 2) + 50)
    .style("font-size", "18px")
    .attr("text-anchor", "middle")
    .text("Sand (%)");

  // Add grid lines
  for (let i = 5; i < 100; i += 5) {
    // clay to silt lines
    svg.append("line")
      .attr("x1", scale(50 - i / 2))
      .attr("y1", scale(i * THIRTY_DEGREES))
      .attr("x2", scale(50 + i / 2))
      .attr("y2", scale(i * THIRTY_DEGREES))
      .attr("stroke", "#ccc");

    // clay to sand lines
    svg.append("line")
      .attr("x1", scale(50 - i / 2))
      .attr("y1", scale(i * THIRTY_DEGREES))
      .attr("x2", scale(100 - i))
      .attr("y2", scale(100 * THIRTY_DEGREES))
      .attr("stroke", "#ccc");

    // clay to sand lines
    svg.append("line")
      .attr("x1", scale(50 + i / 2))
      .attr("y1", scale(i * THIRTY_DEGREES))
      .attr("x2", scale(i))
      .attr("y2", scale(100 * THIRTY_DEGREES))
      .attr("stroke", "#ccc");
  }

  // Add ticks and tick labels
  for (let i = 0; i <= 100; i += 5) {
    // Sand axis
    svg.append("line")
      .attr("x1", scale(i))
      .attr("y1", scale(100 * THIRTY_DEGREES))
      .attr("x2", scale(i))
      .attr("y2", scale(100 * THIRTY_DEGREES + 1))
      .attr("transform", `rotate(-30, ${scale(i)}, ${scale(100 * THIRTY_DEGREES)})`)
      .attr("stroke", "black");

    svg.append("text")
      .attr("x", scale(i) + 20)
      .attr("y", scale(100 * THIRTY_DEGREES + 4))
      .attr("text-anchor", "middle")
      .style("font-size", "13px")
      .attr("transform", `rotate(30, ${scale(i) + 20}, ${scale(100 * THIRTY_DEGREES)})`)
      .text(`${100 - i}`);

    // Silt axis
    svg.append("line")
      .attr("x1", scale(50 + (i / 2)))
      .attr("y1", scale(i * THIRTY_DEGREES))
      .attr("x2", scale(50 + (i / 2) + 1))
      .attr("y2", scale(i * THIRTY_DEGREES))
      .attr("stroke", "black")
      .attr("transform", `rotate(-60, ${scale(50 + (i / 2))}, ${scale(i * THIRTY_DEGREES)})`);

    svg.append("text")
      .attr("x", scale(50 + (i / 2) + 2))
      .attr("y", scale(i * THIRTY_DEGREES) + 3)
      .attr("text-anchor", "start")
      .style("font-size", "13px")
      .attr("transform", `rotate(-50, ${scale(50 + (i / 2))}, ${scale(i * THIRTY_DEGREES)})`)
      .text(`${i}`);

    // Clay axis
    svg.append("line")
      .attr("x1", scale(50 - (i / 2)))
      .attr("y1", scale(i * THIRTY_DEGREES))
      .attr("x2", scale(50 - (i / 2) - 1))
      .attr("y2", scale(i * THIRTY_DEGREES))
      .attr("stroke", "black");

    svg.append("text")
      .attr("x", scale(50 - (i / 2) - 2))
      .attr("y", scale(i * THIRTY_DEGREES))
      .attr("text-anchor", "end")
      .style("font-size", "13px")
      .text(`${100 - i}`);
  }

  // clay block
  let clayPath = `M${scale(50)},${scale(0)}`; // starting point
  clayPath += ` L${scale(50 + (40 / 2))},${scale(40) * THIRTY_DEGREES}`;
  clayPath += ` L${scale(50 + (20 / 2))},${scale(60) * THIRTY_DEGREES}`;
  clayPath += ` L${scale(50 - (30 / 2))},${scale(60) * THIRTY_DEGREES}`; 
  clayPath += ` L${scale(50 - (45 / 2))},${scale(45) * THIRTY_DEGREES}`;
  clayPath += " Z"; // return to start
  svg.append("path")
    .attr("id", "clayPath")
    .attr("d", clayPath)
    .attr("stroke", "black")
    .attr("stroke-width", "2px")
    .attr("fill", "rgba(0, 255, 255, 0.3)")
    .on("mouseover", () => {
      const color = d3.select("#clayPath").style("fill");
      tooltipContainer.transition().duration(300)
        .style("background-color", color);

      tooltip.html("<b>Soil Type:</b> Clay<br><br><b>Clay Content:</b> 40-100%<br><b>Silt Content:</b> 0-40%<br><b>Sand Content:</b> 0-45%")
    })
    .on("click", () => {
      const url = "https://ccte-cced-amos.epa.gov/methods_list?matrix=contains_clay";
      window.open(url, "_blank");
    });

  svg.append("rect")
    .attr("x", scale(50) - 25)
    .attr("y", scale(30) - 21)
    .attr("width", 50)
    .attr("height", 30)
    .attr("fill", "#eee")
    .attr("stroke", "black")
    .attr("rx", "3px")
    .attr("ry", "3px")
    .style("pointer-events", "none");

  svg.append("text")
    .attr("x", scale(50))
    .attr("y", scale(30))
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .style("pointer-events", "none")
    .text("Clay");

  // silty clay block
  let siltyClayPath = `M${scale(50 + (40 / 2))},${scale(40) * THIRTY_DEGREES}`; // starting point
  siltyClayPath += ` L${scale(50 + (60 / 2))},${scale(60) * THIRTY_DEGREES}`;
  siltyClayPath += ` L${scale(50 + (20 / 2))},${scale(60) * THIRTY_DEGREES}`;
  siltyClayPath += " Z"; // return to start
  svg.append("path")
    .attr("id", "siltyClayPath")
    .attr("d", siltyClayPath)
    .attr("stroke", "black")
    .attr("stroke-width", "2px")
    .attr("fill", "rgba(247, 255, 86, 0.3)")
    .on("mouseover", () => {
      const color = d3.select("#siltyClayPath").style("fill");
      tooltipContainer.transition().duration(300)
        .style("background-color", color);

      tooltip.html("<b>Soil Type:</b> Silty Clay<br><br><b>Clay Content:</b> 40-60%<br><b>Silt Content:</b> 40-60%<br><b>Sand Content:</b> 0-20%")
    })
    .on("click", () => {
      const url = "https://ccte-cced-amos.epa.gov/methods_list?matrix=contains_silty clay";
      window.open(url, "_blank");
    });

  svg.append("rect")
    .attr("x", scale(70) - 25)
    .attr("y", scale(45) - 10)
    .attr("width", 50)
    .attr("height", 45)
    .attr("fill", "#eee")
    .attr("stroke", "black")
    .attr("rx", "3px")
    .attr("ry", "3px")
    .style("pointer-events", "none");

  svg.append("text")
    .attr("x", scale(70))
    .attr("y", scale(45) + 9)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("pointer-events", "none")
    .append("tspan")
      .attr("x", scale(70))
      .attr("dy", "0em")
      .text("Silty")
    .append("tspan")
      .attr("x", scale(70))
      .attr("dy", "1em")
      .text("Clay");

  // silty clay loam block
  let siltyClayLoamPath = `M${scale(50 + (60 / 2))},${scale(60) * THIRTY_DEGREES}`; // starting point
  siltyClayLoamPath += ` L${scale(50 + (72.5 / 2))},${scale(72.5) * THIRTY_DEGREES}`;
  siltyClayLoamPath += ` L${scale(50 + (32.5 / 2))},${scale(72.5) * THIRTY_DEGREES}`;
  siltyClayLoamPath += ` L${scale(50 + (20 / 2))},${scale(60) * THIRTY_DEGREES}`;
  siltyClayLoamPath += " Z"; // return to start
  svg.append("path")
    .attr("id", "siltyClayLoamPath")
    .attr("d", siltyClayLoamPath)
    .attr("stroke", "black")
    .attr("stroke-width", "2px")
    .attr("fill", "rgba(255, 86, 204, 0.3)")
    .on("mouseover", () => {
      const color = d3.select("#siltyClayLoamPath").style("fill");
      tooltipContainer.transition().duration(300)
        .style("background-color", color);

      tooltip.html("<b>Soil Type:</b> Silty Clay Loam<br><br><b>Clay Content:</b> 27.5-40%<br><b>Silt Content:</b> 40-72.5%<br><b>Sand Content:</b> 0-20%")
    })
    .on("click", () => {
      const url = "https://ccte-cced-amos.epa.gov/methods_list?matrix=contains_silty clay loam";
      window.open(url, "_blank");
    });

  svg.append("rect")
    .attr("x", scale(73) - 43)
    .attr("y", scale(55) - 10)
    .attr("width", 86)
    .attr("height", 45)
    .attr("fill", "#eee")
    .attr("stroke", "black")
    .attr("rx", "3px")
    .attr("ry", "3px")
    .style("pointer-events", "none");

  svg.append("text")
    .attr("x", scale(84))
    .attr("y", scale(55) + 9)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("pointer-events", "none")
    .append("tspan")
      .attr("x", scale(73))
      .attr("dy", "0em")
      .text("Silty")
    .append("tspan")
      .attr("x", scale(73))
      .attr("dy", "1em")
      .text("Clay Loam");
  
  // silt loam block
  let siltLoamPath = `M${scale(50 + (72.5 / 2))},${scale(72.5) * THIRTY_DEGREES}`; // starting point
  siltLoamPath += ` L${scale(50 + (87.5 / 2))},${scale(87.5) * THIRTY_DEGREES}`;
  siltLoamPath += ` L${scale(50 + (72.5 / 2))},${scale(87.5) * THIRTY_DEGREES}`;
  siltLoamPath += ` L${scale(50 + (60 / 2))},${scale(100) * THIRTY_DEGREES}`;
  siltLoamPath += ` L${scale(50 + (0 / 2))},${scale(100) * THIRTY_DEGREES}`;
  siltLoamPath += ` L${scale(50 + (27.5 / 2))},${scale(72.5) * THIRTY_DEGREES}`;
  siltLoamPath += " Z"; // return to start
  svg.append("path")
    .attr("id", "siltLoamPath")
    .attr("d", siltLoamPath)
    .attr("stroke", "black")
    .attr("stroke-width", "2px")
    .attr("fill", "rgba(150, 66, 253, 0.3)")
    .on("mouseover", () => {
      const color = d3.select("#siltLoamPath").style("fill");
      tooltipContainer.transition().duration(300)
        .style("background-color", color);

      tooltip.html("<b>Soil Type:</b> Silt Loam<br><br><b>Clay Content:</b> 12.5-27.5%<br><b>Silt Content:</b> 50-87.5%<br><b>Sand Content:</b> 0-50%");
    })
    .on("click", () => {
      const url = "https://ccte-cced-amos.epa.gov/methods_list?matrix=silt loam";
      window.open(url, "_blank");
    });

  svg.append("rect")
    .attr("x", scale(73) - 32)
    .attr("y", scale(71) - 9)
    .attr("width", 64)
    .attr("height", 50)
    .attr("fill", "#eee")
    .attr("stroke", "black")
    .attr("rx", "3px")
    .attr("ry", "3px")
    .style("pointer-events", "none");

  svg.append("text")
    .attr("x", scale(84))
    .attr("y", scale(71) + 12)
    .attr("text-anchor", "middle")
    .style("font-size", "18px")
    .style("pointer-events", "none")
    .append("tspan")
      .attr("x", scale(73))
      .attr("dy", "0em")
      .text("Silt")
    .append("tspan")
      .attr("x", scale(73))
      .attr("dy", "1em")
      .text("Loam");

    // silt block
    let siltPath = `M${scale(50 + (87.5 / 2))},${scale(87.5) * THIRTY_DEGREES}`; // starting point
    siltPath += ` L${scale(50 + (100 / 2))},${scale(100) * THIRTY_DEGREES}`;
    siltPath += ` L${scale(50 + (60 / 2))},${scale(100) * THIRTY_DEGREES}`;
    siltPath += ` L${scale(50 + (72.5 / 2))},${scale(87.5) * THIRTY_DEGREES}`;
    siltPath += " Z"; // return to start
    svg.append("path")
      .attr("id", "siltPath")
      .attr("d", siltPath)
      .attr("stroke", "black")
      .attr("stroke-width", "2px")
      .attr("fill", "rgba(83, 243, 91, 0.3)")
      .on("mouseover", () => {
        const color = d3.select("#siltPath").style("fill");
        tooltipContainer.transition().duration(300)
          .style("background-color", color);

        tooltip.html("<b>Soil Type:</b> Silt<br><br><b>Clay Content:</b> 0-12.5%<br><b>Silt Content:</b> 80-100%<br><b>Sand Content:</b> 0-20%");
      })
      .on("click", () => {
        const url = "https://ccte-cced-amos.epa.gov/methods_list?matrix=contains_silt";
        window.open(url, "_blank");
      });

    svg.append("rect")
      .attr("x", scale(90) - 25)
      .attr("y", scale(81) - 8)
      .attr("width", 50)
      .attr("height", 25)
      .attr("fill", "#eee")
      .attr("stroke", "black")
      .attr("rx", "3px")
      .attr("ry", "3px")
      .style("pointer-events", "none");
  
    svg.append("text")
      .attr("x", scale(90))
      .attr("y", scale(80) + 16)
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .style("pointer-events", "none")
      .append("tspan")
        .attr("x", scale(90))
        .attr("dy", "0em")
        .text("Silt");

    // clay loam block
    let clayLoamPath = `M${scale(50 + (32.5 / 2))},${scale(72.5) * THIRTY_DEGREES}`; // starting point
    clayLoamPath += ` L${scale(50 - (17.5 / 2))},${scale(72.5) * THIRTY_DEGREES}`;
    clayLoamPath += ` L${scale(50 - (30 / 2))},${scale(60) * THIRTY_DEGREES}`;
    clayLoamPath += ` L${scale(50 + (20 / 2))},${scale(60) * THIRTY_DEGREES}`;
    clayLoamPath += " Z"; // return to start
    svg.append("path")
      .attr("id", "clayLoamPath")
      .attr("d", clayLoamPath)
      .attr("stroke", "black")
      .attr("stroke-width", "2px")
      .attr("fill", "rgba(165, 233, 40, 0.3)")
      .on("mouseover", () => {
        const color = d3.select("#clayLoamPath").style("fill");
        tooltipContainer.transition().duration(300)
          .style("background-color", color);

        tooltip.html("<b>Soil Type:</b> Clay Loam<br><br><b>Clay Content:</b> 27.5-40%<br><b>Silt Content:</b> 15-52.5%<br><b>Sand Content:</b> 20-45%");
      })
      .on("click", () => {
        const url = "https://ccte-cced-amos.epa.gov/methods_list?matrix=contains_clay loam";
        window.open(url, "_blank");
      });

    svg.append("rect")
      .attr("x", scale(50) - 45)
      .attr("y", scale(56) - 5.5)
      .attr("width", 100)
      .attr("height", 32)
      .attr("fill", "#eee")
      .attr("stroke", "black")
      .attr("rx", "3px")
      .attr("ry", "3px")
      .style("pointer-events", "none");
  
    svg.append("text")
      .attr("x", scale(50))
      .attr("y", scale(56) + 16)
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .style("pointer-events", "none")
      .append("tspan")
        .attr("x", scale(50) + 5)
        .attr("dy", "0em")
        .text("Clay Loam");

    // loam block
    let loamPath = `M${scale(50 + (27.5 / 2))},${scale(72.5) * THIRTY_DEGREES}`; // starting point
    loamPath += ` L${scale(50 - (17.5 / 2))},${scale(72.5) * THIRTY_DEGREES}`;
    loamPath += ` L${scale(50 - (25 / 2))},${scale(80) * THIRTY_DEGREES}`;
    loamPath += ` L${scale(50 - (12.5 / 2))},${scale(92.5) * THIRTY_DEGREES}`;
    loamPath += ` L${scale(50 + (7.5 / 2))},${scale(92.5) * THIRTY_DEGREES}`;
    loamPath += " Z"; // return to start
    svg.append("path")
      .attr("id", "loamPath")
      .attr("d", loamPath)
      .attr("stroke", "black")
      .attr("stroke-width", "2px")
      .attr("fill", "rgba(234, 142, 4, 0.3)")
      .on("mouseover", () => {
        const color = d3.select("#loamPath").style("fill");
        tooltipContainer.transition().duration(300)
          .style("background-color", color);

        tooltip.html("<b>Soil Type:</b> Loam<br><br><b>Clay Content:</b> 7.5-27.5%<br><b>Silt Content:</b> 27.5-50%<br><b>Sand Content:</b> 22.5-52.5%");
      })
      .on("click", () => {
        const url = "https://ccte-cced-amos.epa.gov/methods_list?matrix=contains_loam";
        window.open(url, "_blank");
      });

    svg.append("rect")
      .attr("x", scale(50) - 30)
      .attr("y", scale(68) - 5.5)
      .attr("width", 60)
      .attr("height", 32)
      .attr("fill", "#eee")
      .attr("stroke", "black")
      .attr("rx", "3px")
      .attr("ry", "3px")
      .style("pointer-events", "none");
  
    svg.append("text")
      .attr("x", scale(50))
      .attr("y", scale(68) + 16)
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .style("pointer-events", "none")
      .append("tspan")
        .attr("x", scale(50))
        .attr("dy", "0em")
        .text("Loam");

    // sandy loam block
    let sandyLoamPath = `M${scale(50 + (7.5 / 2))},${scale(92.5) * THIRTY_DEGREES}`; // starting point
    sandyLoamPath += ` L${scale(50 - (0 / 2))},${scale(100) * THIRTY_DEGREES}`;
    sandyLoamPath += ` L${scale(50 - (40 / 2))},${scale(100) * THIRTY_DEGREES}`;
    sandyLoamPath += ` L${scale(50 - (85 / 2))},${scale(85) * THIRTY_DEGREES}`;
    sandyLoamPath += ` L${scale(50 - (80 / 2))},${scale(80) * THIRTY_DEGREES}`;
    sandyLoamPath += ` L${scale(50 - (25 / 2))},${scale(80) * THIRTY_DEGREES}`;
    sandyLoamPath += ` L${scale(50 - (12.5 / 2))},${scale(92.5) * THIRTY_DEGREES}`;
    sandyLoamPath += " Z"; // return to start
    svg.append("path")
      .attr("id", "sandyLoamPath")
      .attr("d", sandyLoamPath)
      .attr("stroke", "black")
      .attr("stroke-width", "2px")
      .attr("fill", "rgba(40, 120, 233, 0.3)")
      .on("mouseover", () => {
        const color = d3.select("#sandyLoamPath").style("fill");
        tooltipContainer.transition().duration(300)
          .style("background-color", color);

        tooltip.html("<b>Soil Type:</b> Sandy Loam<br><br><b>Clay Content:</b> 0-20%<br><b>Silt Content:</b> 0-50%<br><b>Sand Content:</b> 42.5-85%");
      })
      .on("click", () => {
        const url = "https://ccte-cced-amos.epa.gov/methods_list?matrix=contains_sandy loam";
        window.open(url, "_blank");
      });

    svg.append("rect")
      .attr("x", scale(25) - 30)
      .attr("y", scale(76) - 13)
      .attr("width", 110)
      .attr("height", 32)
      .attr("fill", "#eee")
      .attr("stroke", "black")
      .attr("rx", "3px")
      .attr("ry", "3px")
      .style("pointer-events", "none");
  
    svg.append("text")
      .attr("x", scale(25))
      .attr("y", scale(75) + 14)
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .style("pointer-events", "none")
      .append("tspan")
        .attr("x", scale(29))
        .attr("dy", "0em")
        .text("Sandy Loam");

    // loamy sand block
    let loamySandPath = `M${scale(50 - (40 / 2))},${scale(100) * THIRTY_DEGREES}`; // starting point
    loamySandPath += ` L${scale(50 - (70 / 2))},${scale(100) * THIRTY_DEGREES}`;
    loamySandPath += ` L${scale(50 - (90 / 2))},${scale(90) * THIRTY_DEGREES}`;
    loamySandPath += ` L${scale(50 - (85 / 2))},${scale(85) * THIRTY_DEGREES}`;
    loamySandPath += " Z"; // return to start
    svg.append("path")
      .attr("id", "loamySandPath")
      .attr("d", loamySandPath)
      .attr("stroke", "black")
      .attr("stroke-width", "2px")
      .attr("fill", "rgba(39, 38, 38, 0.3)")
      .on("mouseover", () => {
        const color = d3.select("#loamySandPath").style("fill");
        tooltipContainer.transition().duration(300)
          .style("background-color", color);

        tooltip.html("<b>Soil Type:</b> Loamy Sand<br><br><b>Clay Content:</b> 0-15%<br><b>Silt Content:</b> 0-30%<br><b>Sand Content:</b> 70-90%");
      })
      .on("click", () => {
        const url = "https://ccte-cced-amos.epa.gov/methods_list?matrix=contains_loamy sand";
        window.open(url, "_blank");
      });

    svg.append("rect")
      .attr("x", scale(15) - 36)
      .attr("y", scale(78) - 13)
      .attr("width", 85)
      .attr("height", 26)
      .attr("fill", "#eee")
      .attr("stroke", "black")
      .attr("rx", "3px")
      .attr("ry", "3px")
      .attr("transform", `rotate(30, ${scale(15) - 30}, ${scale(78) - 13})`)
      .style("pointer-events", "none");
  
    svg.append("text")
      .attr("x", scale(15))
      .attr("y", scale(75) + 23)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("pointer-events", "none")
      .attr("transform", `rotate(30, ${scale(15) - 30}, ${scale(78) - 13})`)
      .append("tspan")
        .attr("x", scale(19) - 18)
        .attr("dy", "0em")
        .text("Loamy Sand");

    // sand block
    let sandPath = `M${scale(50 - (70 / 2))},${scale(100) * THIRTY_DEGREES}`; // starting point
    sandPath += ` L${scale(50 - (100 / 2))},${scale(100) * THIRTY_DEGREES}`;
    sandPath += ` L${scale(50 - (90 / 2))},${scale(90) * THIRTY_DEGREES}`;
    sandPath += " Z"; // return to start
    svg.append("path")
      .attr("id", "sandPath")
      .attr("d", sandPath)
      .attr("stroke", "black")
      .attr("stroke-width", "2px")
      .attr("fill", "rgba(0, 154, 133, 0.3)")
      .on("mouseover", () => {
        const color = d3.select("#sandPath").style("fill");
        tooltipContainer.transition().duration(300)
          .style("background-color", color);

        tooltip.html("<b>Soil Type:</b> Sand<br><br><b>Clay Content:</b> 0-10%<br><b>Silt Content:</b> 0-15%<br><b>Sand Content:</b> 85-100%");
      })
      .on("click", () => {
        const url = "https://ccte-cced-amos.epa.gov/methods_list?matrix=contains_sand";
        window.open(url, "_blank");
      });

    svg.append("rect")
      .attr("x", scale(6.60) - 23)
      .attr("y", scale(83) - 8)
      .attr("width", 40)
      .attr("height", 25)
      .attr("fill", "#eee")
      .attr("stroke", "black")
      .attr("rx", "3px")
      .attr("ry", "3px")
      .style("pointer-events", "none");
  
    svg.append("text")
      .attr("x", scale(5) + 6)
      .attr("y", scale(82) + 15)
      .attr("text-anchor", "middle")
      .style("font-size", "15px")
      .style("pointer-events", "none")
      .append("tspan")
        .attr("dy", "0em")
        .text("Sand");
    
    // sandy clay block
    let sandyClayPath = `M${scale(50 - (45 / 2))},${scale(45) * THIRTY_DEGREES}`; // starting point
    sandyClayPath += ` L${scale(50 - (25 / 2))},${scale(65) * THIRTY_DEGREES}`;
    sandyClayPath += ` L${scale(50 - (65 / 2))},${scale(65) * THIRTY_DEGREES}`;
    sandyClayPath += " Z"; // return to start
    svg.append("path")
      .attr("id", "sandyClayPath")
      .attr("d", sandyClayPath)
      .attr("stroke", "black")
      .attr("stroke-width", "2px")
      .attr("fill", "rgba(255, 0, 0, 0.3)")
      .on("mouseover", () => {
        const color = d3.select("#sandyClayPath").style("fill");
        tooltipContainer.transition().duration(300)
          .style("background-color", color);

        tooltip.html("<b>Soil Type:</b> Sandy Clay<br><br><b>Clay Content:</b> 35-55%<br><b>Silt Content:</b> 0-20%<br><b>Sand Content:</b> 45-65%");
      })
      .on("click", () => {
        const url = "https://ccte-cced-amos.epa.gov/methods_list?matrix=contains_sandy clay";
        window.open(url, "_blank");
      });

    svg.append("rect")
      .attr("x", scale(27.5) - 30)
      .attr("y", scale(50) - 8)
      .attr("width", 60)
      .attr("height", 42)
      .attr("fill", "#eee")
      .attr("stroke", "black")
      .attr("rx", "3px")
      .attr("ry", "3px")
      .style("pointer-events", "none");
  
    svg.append("text")
      .attr("x", scale(27.5))
      .attr("y", scale(50) + 10)
      .attr("text-anchor", "middle")
      .style("font-size", "17px")
      .style("pointer-events", "none")
      .append("tspan")
        .attr("dy", "0em")
        .text("Sandy")
      .append("tspan")
        .attr("x", scale(27.5) )
        .attr("dy", "1em")
        .text("Clay");

    // sandy clay block
    let sandyClayLoamPath = `M${scale(50 - (25 / 2))},${scale(65) * THIRTY_DEGREES}`; // starting point
    sandyClayLoamPath += ` L${scale(50 - (17.5 / 2))},${scale(72.5) * THIRTY_DEGREES}`;
    sandyClayLoamPath += ` L${scale(50 - (25 / 2))},${scale(80) * THIRTY_DEGREES}`;
    sandyClayLoamPath += ` L${scale(50 - (80 / 2))},${scale(80) * THIRTY_DEGREES}`;
    sandyClayLoamPath += ` L${scale(50 - (65 / 2))},${scale(65) * THIRTY_DEGREES}`;
    sandyClayLoamPath += " Z"; // return to start
    svg.append("path")
      .attr("id", "sandyClayLoamPath")
      .attr("d", sandyClayLoamPath)
      .attr("stroke", "black")
      .attr("stroke-width", "2px")
      .attr("fill", "rgba(0, 8, 255, 0.3)")
      .on("mouseover", () => {
        const color = d3.select("#sandyClayLoamPath").style("fill");
        tooltipContainer.transition().duration(300)
          .style("background-color", color);

        tooltip.html("<b>Soil Type:</b> Sandy Clay Loam<br><br><b>Clay Content:</b> 20-35%<br><b>Silt Content:</b> 0-27.5%<br><b>Sand Content:</b> 45-80%");
      })
      .on("click", () => {
        const url = "https://ccte-cced-amos.epa.gov/methods_list?matrix=contains_sandy clay loam";
        window.open(url, "_blank");
      });

    svg.append("rect")
      .attr("x", scale(27.5) - 50)
      .attr("y", scale(61) - 14)
      .attr("width", 100)
      .attr("height", 50)
      .attr("fill", "#eee")
      .attr("stroke", "black")
      .attr("rx", "3px")
      .attr("ry", "3px")
      .style("pointer-events", "none");
  
    svg.append("text")
      .attr("x", scale(27.5))
      .attr("y", scale(61) + 7)
      .attr("text-anchor", "middle")
      .style("font-size", "18px")
      .style("pointer-events", "none")
      .append("tspan")
        .attr("dy", "0em")
        .text("Sandy")
      .append("tspan")
        .attr("x", scale(27.5) )
        .attr("dy", "1em")
        .text("Clay Loam");
    
}

createSoilTernaryPlot();
