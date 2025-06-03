import { useEffect, useState } from 'react';
import axios from 'axios';

export function useTokenPrice(coinId: string) {
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`
        );
        setPrice(res.data[coinId].usd);
      } catch (error) {
        console.error('Erro ao buscar preço do token:', error);
      }
    };

    fetchPrice();

    const interval = setInterval(fetchPrice, 60000); // atualiza a cada 60 segundos
    return () => clearInterval(interval);
  }, [coinId]);

  return price;
}
