import type { Handler } from '@netlify/functions';

export const handler: Handler = async (event) => {
  const address = event.queryStringParameters?.address;

  if (!address) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'address é obrigatório' }),
    };
  }

  try {
    const response = await fetch(`https://public-api.birdeye.so/defi/price?address=${address}`, {
      headers: {
        'X-API-KEY': '1902a09019154db18195515fc07bc4f8', // ✅ substitua pela sua nova chave sem "@"
        'accept': 'application/json',
        'x-chain': 'solana',
      },
    });

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
      body: JSON.stringify({ error: 'Erro ao buscar dados da Birdeye' }),
    };
  }
};
