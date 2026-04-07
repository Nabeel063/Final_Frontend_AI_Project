import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const mockData = [
  { name: 'JAN', enquiries: 340, companies: 150 },
  { name: 'FEB', enquiries: 300, companies: 330 },
  { name: 'MAR', enquiries: 210, companies: 175 },
  { name: 'APR', enquiries: 80, companies: 45 },
  { name: 'MAY', enquiries: 410, companies: 410 },
  { name: 'JUN', enquiries: 160, companies: 155 },
  { name: 'JUL', enquiries: 320, companies: 345 },
  { name: 'AUG', enquiries: 55, companies: 115 },
  { name: 'SEP', enquiries: 275, companies: 265 },
  { name: 'OCT', enquiries: 355, companies: 345 },
  { name: 'NOV', enquiries: 30, companies: 15 },
  { name: 'DEC', enquiries: 385, companies: 395 },
];

export default function PerformanceTrends({ performanceData }) {
  const displayData = performanceData && performanceData.length > 0 ? performanceData : mockData;

  return (
    <div className="bg-white rounded-[32px] p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col w-full h-full min-h-[400px] hover:shadow-md transition-shadow">
    
      <div className="flex justify-between items-center mb-6 w-full">
        <h2 className="text-[#00004d] m-0 text-xl md:text-2xl font-bold">Performance Trends</h2>
      </div>

      <div className="flex-1 w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={displayData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={6}>
            <defs>
              
              <linearGradient id="colorEnquiries" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9b9bff" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={1} />
              </linearGradient>
             
              <linearGradient id="colorCompanies" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff9eb5" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={1} />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} strokeDasharray="3 3" verticalFill={['#fff']} stroke="none" />
            
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }} 
              dy={10}
            />
            
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 12 }}
            />

            <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
            
            <Legend 
              verticalAlign="top" 
              align="right" 
              iconType="circle" 
              wrapperStyle={{ paddingBottom: '20px' }}
            />

            <Bar 
              dataKey="enquiries" 
              name="Enquiries" 
              fill="url(#colorEnquiries)" 
              radius={[6, 6, 6, 6]} 
              barSize={12} 
            />
            
            <Bar 
              dataKey="companies" 
              name="Companies" 
              fill="url(#colorCompanies)" 
              radius={[6, 6, 6, 6]} 
              barSize={12} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}