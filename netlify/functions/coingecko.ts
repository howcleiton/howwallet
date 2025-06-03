import type { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  const tokenId = event.queryStringParameters?.tokenId;
  const days = event.queryStringParameters?.days || '1';

  if (!tokenId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'tokenId é obrigatório' }),
    };
  }

  const url = `https://api.coingecko.com/api/v3/coins/${tokenId}/market_chart?vs_currency=usd&days=${days}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro ao buscar dados da CoinGecko' }),
    };
  }
};
