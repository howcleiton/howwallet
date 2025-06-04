import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";

const RANGE_OPTIONS = [
  { label: "1H", value: "1m" },   // últimos minutos
  { label: "1D", value: "1h" },   // últimas horas
  { label: "1S", value: "4h" },   // últimos dias
  { label: "1M", value: "1d" },   // últimos 30 dias
  { label: "1A", value: "7d" },   // últimos 365 dias agrupados
];

interface PriceChartProps {
  tokenId: string; // mintAddress
}

const PriceChart = ({ tokenId }: PriceChartProps) => {
  const [range, setRange] = useState("1h");
  const [chartData, setChartData] = useState<{ time: number; price: number }[]>([]);

  useEffect(() => {
    async function loadPrices() {
      try {
        const response = await fetch(`https://public-api.birdeye.so/public/price_history?address=${tokenId}&interval=${range}`, {
          headers: {
            "X-API-KEY": "1902a09019154db18195515fc07bc4f8",
            "accept": "application/json",
          },
        });

        const data = await response.json();

        if (data?.data?.items && Array.isArray(data.data.items)) {
          const formatted = data.data.items
            .map((item: any) => ({
              time: item.timestamp * 1000, // converte para ms
              price: item.value,
            }))
            .sort((a: { time: number }, b: { time: number }) => a.time - b.time); // garante que estão em ordem crescente

          setChartData(formatted);
        } else {
          console.warn("⚠️ Dados de gráfico inválidos:", data);
          setChartData([]);
        }
      } catch (err) {
        console.error("❌ Erro ao buscar histórico da Birdeye:", err);
        setChartData([]);
      }
    }

    loadPrices();
  }, [range, tokenId]);

  return (
    <div>
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={chartData}>
            <XAxis
              dataKey="time"
              hide
              tickFormatter={(time) => format(new Date(time), "HH:mm")}
            />
            <Tooltip
              formatter={(value: number) => `$${value.toFixed(2)}`}
              labelFormatter={(label: number) =>
                format(new Date(label), "MMM d, HH:mm")
              }
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#16c784"
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="text-center text-sm text-zinc-400 py-6">
          Nenhum dado disponível para este período.
        </div>
      )}

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
