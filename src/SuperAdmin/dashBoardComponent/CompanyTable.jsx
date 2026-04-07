import React, { useState } from 'react';
import { Search, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

const CompanyTable = ({ data = [] }) => {
  const [activeTab, setActiveTab] = useState('Enquiries');

  const getTypeStyle = (type) => {
    switch (type?.toLowerCase()) {
      case 'non-tech': return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'product': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'service': return 'bg-pink-50 text-pink-600 border-pink-100';
      case 'it': return 'bg-green-50 text-green-600 border-green-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl p-6 shadow-sm border border-gray-50">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex gap-8 border-b border-transparent">
          {['Companies', 'Enquiries'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xl font-bold pb-2 transition-all duration-200 outline-none ${
                activeTab === tab 
                ? 'text-gray-900 border-b-4 border-gray-900' 
                : 'text-gray-400 border-b-4 border-transparent'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
          />
        </div>
      </div>

      <div className="overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <table className="w-full text-left border-separate border-spacing-y-0">
          <thead>
            <tr className="text-gray-800 text-sm font-semibold border-b border-gray-100">
              <th className="py-4 px-4 font-bold">Serial No.</th>
              <th className="py-4 px-4 font-bold">Company Name</th>
              <th className="py-4 px-4 font-bold">Type</th>
              <th className="py-4 px-4 font-bold">Email</th>
              <th className="py-4 px-4 font-bold">State</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-700">
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={item.id || index} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-5 px-4">{index + 1}</td>
                  <td className="py-5 px-4 font-medium text-gray-900">{item.companyName}</td>
                  <td className="py-5 px-4">
                    <span className={`px-3 py-1 rounded-lg border text-[11px] font-bold uppercase tracking-wider ${getTypeStyle(item.type)}`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="py-5 px-4 text-gray-500">{item.email}</td>
                  <td className="py-5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1 bg-[#F1F3FF] text-[#5D5FEF] px-3 py-1 rounded-full text-xs font-semibold border border-[#E0E4FF]">
                        <MapPin className="w-3.5 h-3.5" />
                        {item.state}
                      </span>
                      {item.hasExtraLocations && (
                        <span className="bg-[#F1F3FF] text-[#5D5FEF] px-2 py-1 rounded-full text-[10px] font-bold border border-[#E0E4FF]">
                          +1
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-10 text-center text-gray-400">No records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center gap-2 mt-8">
        <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
        {[1, 2, 3, 4].map((num) => (
          <button
            key={num}
            className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${
              num === 1 
              ? 'bg-[#5D5FEF] text-white shadow-lg shadow-indigo-200' 
              : 'border border-gray-200 text-gray-500 hover:bg-gray-50'
            }`}
          >
            {num}
          </button>
        ))}
        <button className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CompanyTable;