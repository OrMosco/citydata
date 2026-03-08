import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface BarChartProps {
  data: { label: string; value: number; color?: string }[];
  width?: number;
  height?: number;
  title?: string;
  unit?: string;
}

export function BarChart({ data, width = 200, height = 150, title, unit = '' }: BarChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 15, bottom: 30, left: 35 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Scales
    const x = d3.scaleBand()
      .domain(data.map(d => d.label))
      .range([0, innerWidth])
      .padding(0.3);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) || 0])
      .nice()
      .range([innerHeight, 0]);

    // Gradient
    const gradient = svg.append('defs')
      .append('linearGradient')
      .attr('id', 'bar-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');
    
    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#3b82f6');
    
    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#1d4ed8');

    // Bars with animation
    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.label) || 0)
      .attr('y', innerHeight)
      .attr('width', x.bandwidth())
      .attr('height', 0)
      .attr('fill', d => d.color || 'url(#bar-gradient)')
      .attr('rx', 3)
      .transition()
      .duration(500)
      .attr('y', d => y(d.value))
      .attr('height', d => innerHeight - y(d.value));

    // X axis
    g.append('g')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(x).tickSize(0))
      .selectAll('text')
      .attr('class', 'text-xs fill-gray-500')
      .attr('transform', 'rotate(-30)')
      .style('text-anchor', 'end');

    // Y axis
    g.append('g')
      .call(d3.axisLeft(y).ticks(5).tickSize(-innerWidth))
      .selectAll('line')
      .attr('stroke', '#e5e7eb')
      .attr('stroke-dasharray', '2,2');

    g.select('.domain').remove();

    // Title
    if (title) {
      svg.append('text')
        .attr('x', width / 2)
        .attr('y', 12)
        .attr('text-anchor', 'middle')
        .attr('class', 'text-xs font-medium fill-gray-600')
        .text(title);
    }

  }, [data, width, height, title, unit]);

  return <svg ref={svgRef}></svg>;
}

export default BarChart;
