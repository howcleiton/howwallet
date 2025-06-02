import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Token } from '@/types';
import { formatUSD } from '@/lib/utils';

interface PriceChartProps {
  token: Token;
}

const PriceChart = ({ token }: PriceChartProps) => {
  const chartData = useMemo(() => {
    // Convert price history array to chart data with timestamps
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    
    return token.priceHistory.map((price, index) => {
      // Create timestamps going back in time, 1 hour apart
      const timestamp = now - (token.priceHistory.length - index - 1) * oneHour;
      return {
        timestamp,
        price
      };
    });
  }, [token.priceHistory]);

  // Calculate min and max price for y-axis domain with some padding
  const minPrice = Math.min(...token.priceHistory) * 0.95;
  const maxPrice = Math.max(...token.priceHistory) * 1.05;

  // Determine if price is trending up or down
  const priceChange = token.priceHistory[token.priceHistory.length - 1] - token.priceHistory[0];
  const lineColor = priceChange >= 0 ? '#22c55e' : '#ef4444';

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#1e1e2e] p-2 rounded-lg border border-[#2d2d3d] shadow-lg">
          <p className="font-medium text-white">{formatUSD(data.price)}</p>
          <p className="text-xs text-gray-400">
            {new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-48 w-full mt-2 mb-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <XAxis 
            dataKey="timestamp" 
            tick={false}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            domain={[minPrice, maxPrice]} 
            tick={false} 
            axisLine={false} 
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke={lineColor} 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, stroke: lineColor, strokeWidth: 2, fill: '#1e1e2e' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;