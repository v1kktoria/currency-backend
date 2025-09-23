import axios from "axios";
import { ExchangeApiResponse } from "../../types/exchange";
import { ApiError } from "../../utils/errors";

const API_URL = 'https://open.er-api.com/v6/latest';

export class RatesApiService {
  async fetchRates(base: string): Promise<Record<string, number>> {
    try {
      const response = await axios.get<ExchangeApiResponse>(`${API_URL}/${base}`);

      if (response.data.result !== 'success') {
        throw ApiError.badRequest(`Валюта "${base}" не поддерживается`);
      }
      
      return response.data.rates;
    } catch (err: unknown) {
      if (err instanceof ApiError) throw err;
      throw ApiError.internal('Ошибка при запросе внешнего API', { message: (err as Error).message });
    }
  }
}
