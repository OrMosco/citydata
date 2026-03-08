import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface GaugeChartProps {
  value: number;
  min: number;
  max: number;
  optimalMin?: number;
  optimalMax?: number;
  label: string;
  unit: string;
  width?: number;
  height?: number;
  status?: 'optimal' | 'low' | 'high';
}

export function GaugeChart({ 
  value, 
  min, 
  max, 
  optimalMin,
  optimalMax,
  label, 
  unit,
  width = 180, 
  height = 120,
  status = 'optimal'
}: GaugeChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 10, right: 10, bottom: 30, left: 10 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const radius = Math.min(innerWidth, innerHeight * 2) / 2;

    const g = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height - margin.bottom})`);

    // Background arc
    const arcGenerator = d3.arc()
      .innerRadius(radius * 0.7)
      .outerRadius(radius)
      .startAngle(-Math.PI / 2)
      .endAngle(Math.PI / 2)
      .cornerRadius(5);

    g.append('path')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .attr('d', arcGenerator as any)
      .attr('fill', '#e5e7eb');

    // Optimal zone (if defined)
    if (optimalMin !== undefined && optimalMax !== undefined) {
      const optimalStartAngle = -Math.PI / 2 + (Math.PI * (optimalMin - min) / (max - min));
      const optimalEndAngle = -Math.PI / 2 + (Math.PI * (optimalMax - min) / (max - min));
      
      const optimalArc = d3.arc()
        .innerRadius(radius * 0.7)
        .outerRadius(radius)
        .startAngle(optimalStartAngle)
        .endAngle(optimalEndAngle)
        .cornerRadius(5);

      g.append('path')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .attr('d', optimalArc as any)
        .attr('fill', '#bbf7d0')
        .attr('opacity', 0.8);
    }

    // Value arc
    const clampedValue = Math.max(min, Math.min(max, value));
    const valueAngle = -Math.PI / 2 + (Math.PI * (clampedValue - min) / (max - min));
    
    const valueArc = d3.arc()
      .innerRadius(radius * 0.7)
      .outerRadius(radius)
      .startAngle(-Math.PI / 2)
      .endAngle(valueAngle)
      .cornerRadius(5);

    const statusColors = {
      optimal: '#22c55e',
      low: '#f97316',
      high: '#ef4444'
    };

    g.append('path')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .attr('d', valueArc as any)
      .attr('fill', statusColors[status])
      .transition()
      .duration(500);

    // Needle
    const needleLength = radius * 0.65;
    const needleX = needleLength * Math.cos(valueAngle - Math.PI / 2);
    const needleY = needleLength * Math.sin(valueAngle - Math.PI / 2);

    g.append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', needleX)
      .attr('y2', needleY)
      .attr('stroke', '#1f2937')
      .attr('stroke-width', 3)
      .attr('stroke-linecap', 'round');

    g.append('circle')
      .attr('r', 6)
      .attr('fill', '#1f2937');

    // Value text
    g.append('text')
      .attr('y', -15)
      .attr('text-anchor', 'middle')
      .attr('class', 'text-lg font-bold')
      .attr('fill', statusColors[status])
      .text(typeof value === 'number' ? value.toFixed(1) : value);

    g.append('text')
      .attr('y', 2)
      .attr('text-anchor', 'middle')
      .attr('class', 'text-xs')
      .attr('fill', '#6b7280')
      .text(unit);

    // Min/Max labels
    g.append('text')
      .attr('x', -radius)
      .attr('y', 15)
      .attr('text-anchor', 'start')
      .attr('class', 'text-xs')
      .attr('fill', '#9ca3af')
      .text(min.toString());

    g.append('text')
      .attr('x', radius)
      .attr('y', 15)
      .attr('text-anchor', 'end')
      .attr('class', 'text-xs')
      .attr('fill', '#9ca3af')
      .text(max.toString());

    // Label
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height - 5)
      .attr('text-anchor', 'middle')
      .attr('class', 'text-xs font-medium')
      .attr('fill', '#374151')
      .text(label);

  }, [value, min, max, optimalMin, optimalMax, label, unit, width, height, status]);

  return <svg ref={svgRef}></svg>;
}

export default GaugeChart;
