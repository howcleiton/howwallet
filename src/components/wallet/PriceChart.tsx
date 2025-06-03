import { useEffect, useState } from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { fetchChartPrices } from "@/lib/utils";

const RANGE_OPTIONS = [
  { label: "1H", value: "0.04" },
  { label: "1D", value: "1" },
  { label: "1S", value: "7" },
  { label: "1M", value: "30" },
  { label: "1A", value: "365" },
];

interface PriceChartProps {
  tokenId: string;
}

const PriceChart = ({ tokenId }: PriceChartProps) => {
  const [range, setRange] = useState("1");
  const [chartData, setChartData] = useState<{ time: number; price: number }[]>([]);

  useEffect(() => {
    async function loadPrices() {
      const rawData = await fetchChartPrices(tokenId, range);
      const formatted = Array.isArray(rawData)
        ? rawData.map(([time, price]) => ({ time, price }))
        : [];
      setChartData(formatted);
    }

    loadPrices();
  }, [range, tokenId]);

  return (
    <div>
      <ResponsiveContainer width="100%" height={160}>
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="price"
            stroke="#16c784"
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Botões de período */}
      <div className="flex justify-center mt-3 gap-2">
        {RANGE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setRange(opt.value)}
            className={`px-3 py-1 rounded-full text-sm ${
              range === opt.value
                ? "bg-[#2e2e3e] text-white"
                : "bg-[#1e1e2e] text-gray-400"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PriceChart;
