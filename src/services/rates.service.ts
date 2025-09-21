import axios from "axios"; 
import { ExchangeApiResponse } from '../types/exchange';
import { Rate } from '../types/rate';
import { ApiError } from '../utils/errors';

const API_URL = 'https://open.er-api.com/v6/latest';

export const getRates = async(base: string, targets?: string | string[]): Promise<Rate[]> => {
  try {
    const response = await axios.get<ExchangeApiResponse>(`${API_URL}/${base}`);
    if (response.data.result !== 'success') {
      throw ApiError.badRequest(`Валюта "${base}" не поддерживается`);
    }

    const rates = response.data.rates;
    const targetArray = Array.isArray(targets) ? targets : targets?.split(',') ?? Object.keys(rates);

    return targetArray.map((currency) => {
      const rate = rates[currency];
      if (rate === undefined) throw ApiError.badRequest(`Валюта "${currency}" не поддерживается`); 
      
      return {
        base_currency: base,
        target_currency: currency,
        rate,
        timestamp: new Date().toISOString(),
  };
});
  } catch (err: unknown) {
    if (err instanceof ApiError) throw err;
    throw ApiError.internal('Неожиданная ошибка при получении курсов валют', {message: (err as Error).message,});
  }
};
