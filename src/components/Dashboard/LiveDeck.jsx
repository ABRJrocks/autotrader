import React from 'react';

const data = Array.from({ length: 24 }).map((_, i) => ({
  timestamp: `2024-09-12 08:00:00`,
  broker: 'BINANCE',
  symbol: 'BTCUSD',
  open: 58154.96,
  high: 58399.38,
  low: 58111.65,
  close: 58215.12,
  change: i % 2 === 0 ? '+0.05%' : '-0.05%'
}));

const DataTable = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="overflow-x-auto relative shadow-lg sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-200">
          <thead className="text-xs uppercase bg-dark-translucent">
            <tr>
              <th scope="col" className="py-3 px-6">Timestamp</th>
              <th scope="col" className="py-3 px-6">Broker</th>
              <th scope="col" className="py-3 px-6">Symbol</th>
              <th scope="col" className="py-3 px-6">Open</th>
              <th scope="col" className="py-3 px-6">High</th>
              <th scope="col" className="py-3 px-6">Low</th>
              <th scope="col" className="py-3 px-6">Close</th>
              <th scope="col" className="py-3 px-6">Change</th>
            </tr>
          </thead>
          <tbody className="bg-blue-translucent">
            {data.map((item, index) => (
              <tr key={index} className="border-b border-gray-700">
                <td className="py-4 px-6">{item.timestamp}</td>
                <td className="py-4 px-6">{item.broker}</td>
                <td className="py-4 px-6">{item.symbol}</td>
                <td className="py-4 px-6">{item.open.toFixed(2)}</td>
                <td className="py-4 px-6">{item.high.toFixed(2)}</td>
                <td className="py-4 px-6">{item.low.toFixed(2)}</td>
                <td className="py-4 px-6">{item.close.toFixed(2)}</td>
                <td className="py-4 px-6">{item.change}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
