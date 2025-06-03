import { useEffect, useState } from 'react';
import axios from 'axios';

export function useTokenPrice(coinId: string) {
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    if (!coinId) return;

    const fetchPrice = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`
        );
        setPrice(response.data[coinId]?.usd ?? null);
      } catch (error) {
        console.error('Erro ao buscar preço da CoinGecko:', error);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 60000); // atualiza a cada 60 segundos
    return () => clearInterval(interval);
  }, [coinId]);

  return price;
}
