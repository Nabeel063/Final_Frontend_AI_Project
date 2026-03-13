import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, Label
} from 'recharts';
import { 
  FileText, Users, MessageSquare, BarChart3, 
  Target, Zap, Clock, ShieldCheck, Briefcase 
} from 'lucide-react';



const statistics = [
  { label: "Reduction in Time-to-Hire", value: "85%" },
  { label: "More Qualified Candidates", value: "3x" },
  { label: "Cost Savings", value: "60%" },
  { label: "Companies Trust Us", value: "500+" },
];

const timeToHireData = [
  { month: 'Jan', traditional: 45, ai: 12 },
  { month: 'Feb', traditional: 42, ai: 10 },
  { month: 'Mar', traditional: 48, ai: 11 },
  { month: 'Apr', traditional: 44, ai: 9 },
  { month: 'May', traditional: 46, ai: 8 },
  { month: 'Jun', traditional: 43, ai: 7 },
];

const qualityScoreData = [
  { week: 'W1', score: 72 },
  { week: 'W2', score: 82 },
  { week: 'W3', score: 88 },
  { week: 'W4', score: 91 },
  { week: 'W5', score: 93 },
  { week: 'W6', score: 95 },
];

const sourceData = [
  { name: 'LinkedIn', value: 35, color: '#6366f1' },
  { name: 'Indeed', value: 25, color: '#10b981' },
  { name: 'Referrals', value: 20, color: '#a855f7' },
  { name: 'Direct', value: 15, color: '#0ea5e9' },
  { name: 'Other', value: 5, color: '#cbd5e1' },
];

const pipelineData = [
  { stage: 'Applied', count: 1200, fill: 'url(#grad1)' },
  { stage: 'Screened', count: 600, fill: 'url(#grad2)' },
  { stage: 'Interview', count: 200, fill: 'url(#grad3)' },
  { stage: 'Final', count: 80, fill: 'url(#grad4)' },
  { stage: 'Hired', count: 40, fill: 'url(#grad5)' },
];

const features = [
  { title: "AI JD Generation", desc: "Generate compelling, bias-free job descriptions in seconds.", icon: <FileText className="w-6 h-6" />, color: "text-blue-600", bg: "bg-blue-50" },
  { title: "Smart Screening", desc: "Automatically screen and rank candidates based on skills.", icon: <Users className="w-6 h-6" />, color: "text-indigo-600", bg: "bg-indigo-50" },
  { title: "AI Interviews", desc: "Conduct intelligent preliminary interviews with NLP.", icon: <MessageSquare className="w-6 h-6" />, color: "text-purple-600", bg: "bg-purple-50" },
  { title: "Advanced Analytics", desc: "Get deep insights into your pipeline with real-time reporting.", icon: <BarChart3 className="w-6 h-6" />, color: "text-cyan-600", bg: "bg-cyan-50" }
];

export default function PowerfulInsights() {
  return (
    <div className="">

      <section className="bg-slate-50 py-12 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs sm:text-sm font-semibold text-indigo-600 mb-4 border border-indigo-100">
              <Zap size={14} /> Real-Time Analytics
            </span>
            <h2 className="text-3xl font-bold md:text-5xl text-slate-900 mb-4 tracking-tight">Powerful Insights at Your Fingertips</h2>
            <p className="text-slate-500 text-base md:text-xl max-w-3xl mx-auto leading-relaxed px-2">Track every metric that matters with our comprehensive analytics dashboard.</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            
            {/* Chart 1: Time to Hire */}
            <div className="bg-white p-5 md:p-6 rounded-[24px] md:rounded-3xl shadow-sm border border-slate-100 flex flex-col">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 sm:gap-0">
                <div>
                  <h4 className="font-bold text-lg md:text-xl text-slate-800">Time to Hire (Days)</h4>
                  <p className="text-xs md:text-sm text-slate-400">Traditional vs AI-Powered</p>
                </div>
                <div className="flex flex-wrap gap-3 text-xs md:text-sm font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-slate-200" /> Traditional</span>
                  <span className="flex items-center gap-1.5"><span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-indigo-600" /> With AI</span>
                </div>
              </div>
              <div className="h-56 md:h-64 w-full mt-auto">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={timeToHireData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={{ stroke: '#e2e8f0', strokeWidth: 1 }} 
                      tickLine={false} 
                      tick={{ fontSize: 11, fill: '#94a3b8' }} 
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 11, fill: '#94a3b8' }} 
                    />
                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="traditional" fill="#e2e8f0" radius={[4, 4, 0, 0]} maxBarSize={36} />
                    <Bar dataKey="ai" fill="#4f46e5" radius={[4, 4, 0, 0]} maxBarSize={36} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Quality Score */}
            <div className="bg-white p-5 md:p-6 rounded-[24px] md:rounded-3xl shadow-sm border border-slate-100 flex flex-col">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 sm:gap-0">
                <div>
                  <h4 className="font-bold text-lg md:text-xl text-slate-800">Candidate Quality Score</h4>
                  <p className="text-xs md:text-sm text-slate-400">AI-optimized matching over time</p>
                </div>
                <span className="bg-emerald-50 border border-emerald-100/50 text-emerald-600 text-xs md:text-sm font-bold px-3 py-1.5 rounded-full">+22% improvement</span>
              </div>
              <div className="h-56 md:h-64 w-full mt-auto">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={qualityScoreData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="week" 
                      axisLine={{ stroke: '#e2e8f0', strokeWidth: 1 }} 
                      tickLine={false} 
                      tick={{ fontSize: 11, fill: '#94a3b8' }} 
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      domain={[60, 100]} 
                      tick={{ fontSize: 11, fill: '#94a3b8' }} 
                    />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Area type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" activeDot={{ r: 6, strokeWidth: 0, fill: '#10b981' }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 3: Candidate Sources */}
            <div className="bg-white p-5 md:p-6 rounded-[24px] md:rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center">
              <div className="flex-1 w-full text-center md:text-left h-full flex flex-col">
                <h4 className="font-bold text-lg md:text-xl text-slate-800">Candidate Sources</h4>
                <p className="text-xs md:text-sm text-slate-400 mb-2 md:mb-4">Where your best hires come from</p>
                <div className="h-48 md:h-56 w-full mt-auto">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={sourceData} innerRadius="60%" outerRadius="80%" paddingAngle={5} dataKey="value" stroke="none">
                        {sourceData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="flex-1 grid grid-cols-2 md:grid-cols-1 gap-3 w-full md:pl-8 mt-6 md:mt-0">
                {sourceData.map((s, i) => (
                  <div key={i} className="flex justify-between items-center text-sm bg-slate-50 md:bg-transparent p-2.5 md:p-0 rounded-xl md:rounded-none border border-slate-100 md:border-none">
                    <span className="flex items-center gap-2.5 text-slate-600 font-medium whitespace-nowrap"><span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full shrink-0" style={{ backgroundColor: s.color }} /> {s.name}</span>
                    <span className="font-bold text-sm md:text-base text-slate-900">{s.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Chart 4: Hiring Pipeline */}
            <div className="bg-white p-5 md:p-6 rounded-[24px] md:rounded-3xl shadow-sm border border-slate-100 flex flex-col">
              <div className="mb-4 text-center md:text-left">
                <h4 className="font-bold text-lg md:text-xl text-slate-800">Hiring Pipeline</h4>
                <p className="text-xs md:text-sm text-slate-400">Real-time funnel visualization</p>
              </div>
              <div className="h-56 md:h-64 w-full mt-auto -ml-3 md:-ml-0">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart layout="vertical" data={pipelineData} margin={{ left: 20, right: 10, top: 10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#6366f1"/><stop offset="100%" stopColor="#0ea5e9"/></linearGradient>
                      <linearGradient id="grad2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#0ea5e9"/><stop offset="100%" stopColor="#10b981"/></linearGradient>
                      <linearGradient id="grad3" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#10b981"/><stop offset="100%" stopColor="#eab308"/></linearGradient>
                      <linearGradient id="grad4" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#eab308"/><stop offset="100%" stopColor="#f97316"/></linearGradient>
                      <linearGradient id="grad5" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#f97316"/><stop offset="100%" stopColor="#ef4444"/></linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                    <XAxis 
                      type="number" 
                      axisLine={{ stroke: '#e2e8f0', strokeWidth: 1 }} 
                      tickLine={false} 
                      tick={{ fontSize: 11, fill: '#94a3b8' }} 
                    />
                    <YAxis 
                      dataKey="stage" 
                      type="category" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 11, fill: '#64748b', fontWeight: 500 }} 
                      width={65}
                    />
                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}