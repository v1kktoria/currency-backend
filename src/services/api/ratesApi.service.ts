import { ExchangeApiResponse } from "../../types/exchange";
import { ApiError } from "../../utils/errors";
import { BaseApiService } from "./baseApi.service";

export class RatesApiService extends BaseApiService{

  async fetchRates(base: string): Promise<Record<string, number>> {
    const data = await this.get<ExchangeApiResponse>(`/${base}`);

    if (data.result !== 'success') {
      throw ApiError.badRequest(`Валюта "${base}" не поддерживается`);
    }
      
    return data.rates;
  }
}
