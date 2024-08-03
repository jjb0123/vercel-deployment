import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './UserGraph.css'; // Import the CSS file for styling

const UserGraph = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data && data.length) {
      const svg = d3.select(chartRef.current);
      svg.selectAll('*').remove(); // Clear previous content

      const margin = { top: 50, right: 30, bottom: 60, left: 40 };
      const width = 500 - margin.left - margin.right;
      const height = 300 - margin.top - margin.bottom;

      const x = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([0, width])
        .padding(0.1);

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .nice()
        .range([height, 0]);

      const svgContent = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // Title
      svgContent.append('text')
        .attr('x', width / 2)
        .attr('y', -margin.top / 2)
        .attr('text-anchor', 'middle')
        .attr('font-size', '20px')
        .attr('font-weight', 'bold')
        .attr('fill', '#333') // Darker color for better visibility
        .attr('text-shadow', '1px 1px 2px rgba(0,0,0,0.3)') // Adding a subtle text shadow
        .text('User Values (randomized)');

      svgContent.append('g')
        .selectAll('rect')
        .data(data)
        .join('rect')
        .attr('x', d => x(d.name))
        .attr('y', d => y(d.value))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d.value))
        .attr('fill', 'lightyellow');

      svgContent.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x).tickSize(0).tickPadding(10));

      svgContent.append('g')
        .attr('class', 'y-axis')
        .call(d3.axisLeft(y));
    }
  }, [data]);

  return (
    <div>
      <svg ref={chartRef} width="500" height="300"></svg>
    </div>
  );
};

export default UserGraph;
