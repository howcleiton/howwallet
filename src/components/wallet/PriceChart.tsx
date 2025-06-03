import { useEffect, useState } from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const RANGE_OPTIONS = [
  { label: "1H", value: "1m" },   // 1 minuto = último 1h
  { label: "1D", value: "1h" },   // 1 hora = último 1d
  { label: "1S", value: "4h" },   // aproxima 1 semana
  { label: "1M", value: "1d" },   // 1 dia = último 1m
  { label: "1A", value: "7d" },   // 7 dias agrupados = aproxima 1 ano
];

interface PriceChartProps {
  tokenId: string; // será o mintAddress agora
}

const PriceChart = ({ tokenId }: PriceChartProps) => {
  const [range, setRange] = useState("1h");
  const [chartData, setChartData] = useState<{ time: number; price: number }[]>([]);

  useEffect(() => {
    async function loadPrices() {
      try {
        const response = await fetch(`https://public-api.birdeye.so/public/price_history?address=${tokenId}&interval=${range}`, {
          headers: {
            "X-API-KEY": "CleitonG2228",
            "accept": "application/json",
          },
        });

        const data = await response.json();

        if (data?.data?.items && Array.isArray(data.data.items)) {
          const formatted = data.data.items.map((item: any) => ({
            time: item.timestamp,
            price: item.value,
          }));
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
