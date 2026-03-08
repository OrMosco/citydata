import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import type { LandUseDistribution } from '../../types';

interface DonutChartProps {
  data: LandUseDistribution;
  width?: number;
  height?: number;
}

const COLORS = {
  residential: '#3b82f6',
  commercial: '#f97316',
  industrial: '#6b7280',
  mixedUse: '#a855f7',
  greenSpace: '#22c55e',
  institutional: '#eab308'
};

const LABELS = {
  residential: 'Residential',
  commercial: 'Commercial',
  industrial: 'Industrial',
  mixedUse: 'Mixed Use',
  greenSpace: 'Green Space',
  institutional: 'Institutional'
};

export function DonutChart({ data, width = 200, height = 200 }: DonutChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const radius = Math.min(width, height) / 2;
    const innerRadius = radius * 0.55;

    const g = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const pieData = Object.entries(data).map(([key, value]) => ({
      key,
      value,
      color: COLORS[key as keyof typeof COLORS],
      label: LABELS[key as keyof typeof LABELS]
    }));

    const pie = d3.pie<typeof pieData[0]>()
      .value(d => d.value)
      .sort(null);

    const arc = d3.arc<d3.PieArcDatum<typeof pieData[0]>>()
      .innerRadius(innerRadius)
      .outerRadius(radius)
      .cornerRadius(3);

    const arcs = g.selectAll('.arc')
      .data(pie(pieData))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', d => d.data.color)
      .attr('stroke', 'white')
      .attr('stroke-width', 2)
      .style('transition', 'all 0.2s ease')
      .on('mouseover', function(_event, d) {
        d3.select(this)
          .attr('transform', 'scale(1.05)')
          .style('filter', 'brightness(1.1)');
        
        if (tooltipRef.current) {
          tooltipRef.current.style.opacity = '1';
          tooltipRef.current.innerHTML = `<strong>${d.data.label}</strong><br/>${d.data.value}%`;
        }
      })
      .on('mouseout', function() {
        d3.select(this)
          .attr('transform', 'scale(1)')
          .style('filter', 'brightness(1)');
        
        if (tooltipRef.current) {
          tooltipRef.current.style.opacity = '0';
        }
      });

    // Center text
    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.2em')
      .attr('class', 'text-sm font-medium fill-gray-500')
      .text('Land Use');

    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1.2em')
      .attr('class', 'text-xs fill-gray-400')
      .text('Distribution');

  }, [data, width, height]);

  return (
    <div className="relative">
      <svg ref={svgRef}></svg>
      <div 
        ref={tooltipRef}
        className="absolute bg-gray-900 text-white text-xs px-2 py-1 rounded pointer-events-none opacity-0 transition-opacity"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      ></div>
    </div>
  );
}

export default DonutChart;
