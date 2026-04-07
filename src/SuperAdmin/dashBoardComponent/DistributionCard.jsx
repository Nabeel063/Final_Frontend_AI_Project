import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const DistributionCard = ({ distributionData: propsData, distributionTotal: propsTotal }) => {
  const distributionData = propsData && propsData.length > 0 ? propsData : [
    { name: 'Enquiries', value: 72, fill: 'url(#purpleGradient)', percentage: 72 },
    { name: 'Companies', value: 72, fill: '#FF8A7A', percentage: 72 },
  ];

  const distributionTotal = propsTotal || 121;

  const totalRelevantValues = distributionData
    .filter(d => d.name !== 'Empty')
    .reduce((acc, curr) => acc + curr.value, 0);

  const displayData = distributionData.map(item => ({
    ...item,
    percentage: item.percentage !== undefined
      ? item.percentage
      : (totalRelevantValues > 0 && item.name !== 'Empty'
          ? Math.round((item.value / totalRelevantValues) * 100)
          : 0),
    fill: item.fill || (item.name === 'Enquiries' ? 'url(#purpleGradient)' : '#FF8A7A'),
  }));

  if (!displayData.find(d => d.name === 'Empty')) {
    const halfVal = totalRelevantValues > 0 ? totalRelevantValues * 0.7 : 50;
    displayData.push({ name: 'Empty', value: halfVal, fill: '#F1F1F1', percentage: 0 });
  }

  const visibleData = displayData.filter(e => e.name !== 'Empty');

  const getLegendColor = (entry) => {
    if (entry.name === 'Enquiries') return 'linear-gradient(135deg,#7E5BEF,#B397FF)';
    return entry.fill || '#FF8A7A';
  };

  return (
    <div className="bg-white rounded-[32px] p-5 shadow-sm border border-gray-100 flex flex-col w-full hover:shadow-md transition-shadow overflow-hidden">


      <h3 className="text-lg font-bold text-[#00004d] mb-3 shrink-0">Overall Distribution</h3>

      <div className="relative w-full shrink-0" style={{ height: 298 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#7E5BEF" />
                <stop offset="100%" stopColor="#B397FF" />
              </linearGradient>
              <pattern id="stripes" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="8" stroke="#F1F1F1" strokeWidth="5" />
              </pattern>
            </defs>

            <Pie
              data={displayData}
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="90%"
              paddingAngle={4}
              dataKey="value"
              startAngle={225}
              endAngle={-45}
              stroke="none"
            >
              {displayData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.name === 'Empty' ? 'url(#stripes)' : entry.fill}
                  cornerRadius={entry.name === 'Empty' ? 0 : 10}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none -translate-y-3">
          <p className="text-xs font-medium text-gray-400 tracking-wide uppercase">Overall</p>
          <p className="text-4xl font-extrabold text-[#1E1B4B] leading-none mt-0.5">{distributionTotal}</p>
        </div>
      </div>

      <div className="flex justify-around w-full mt-3 shrink-0">
        {visibleData.map((entry, index) => (
          <div key={index} className="flex flex-col items-center gap-1.5 min-w-0">
            
            <div
              className="w-10 h-2.5 rounded-full shrink-0"
              style={{ background: getLegendColor(entry) }}
            />
           
            <div className="flex items-center gap-1 flex-wrap justify-center">
              <span className="text-gray-500 text-xs font-normal whitespace-nowrap">{entry.name}</span>
              <span className="font-bold text-[#1E1B4B] text-xs whitespace-nowrap">{entry.percentage}%</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default DistributionCard;