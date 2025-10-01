import { Currency } from "../../types/currency";
import { ExchangeApiResponse } from "../../types/exchange";
import { ApiError } from "../../utils/errors";
import { BaseApiService } from "./baseApi.service";

export class ExchangeApiService extends BaseApiService {

  async fetchRates(base: string): Promise<Record<string, number>> {
    const data = await this.get<ExchangeApiResponse>(`/${base}`);

    if (data.result !== 'success') {
      throw ApiError.badRequest(`Валюта "${base}" не поддерживается`);
    }
      
    return data.rates;
  }

  async fetchCurrencies(): Promise<Currency[]> {
    const data = await this.get<ExchangeApiResponse>("/USD");
    if (data.result !== "success") {
      throw ApiError.notFound("Нет доступных валют");
    }

    const rates = data.rates;
    return Object.keys(rates).map(code => ({ code }));
  }
}