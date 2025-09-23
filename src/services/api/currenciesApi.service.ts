import axios from "axios";
import { Currency } from "../../types/currency";
import { ExchangeApiResponse } from "../../types/exchange";
import { ApiError } from "../../utils/errors";

const API_URL = "https://open.er-api.com/v6/latest/USD";

export class CurrenciesApiService {
  async fetchCurrencies(): Promise<Currency[]> {
    try {
      const response = await axios.get<ExchangeApiResponse>(API_URL);
      if (response.data.result !== "success") {
        throw ApiError.badRequest("Ошибка внешнего API", { response: response.data });
      }

      const rates = response.data.rates;
      if (!rates || Object.keys(rates).length === 0) throw ApiError.notFound("Нет доступных валют");
      
      return Object.keys(rates).map(code => ({ code }));
    } catch (err: unknown) {
      if (err instanceof ApiError) throw err;
      throw ApiError.internal("Ошибка при получении валют", { message: (err as Error).message });
    }
  }
}
