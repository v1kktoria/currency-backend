import { MemoryCacheService } from "./cache/memoryCache.service";
import { CachedCurrencyRepository } from "../repositories/cachedCurrency.repository";
import { Currency } from "../types/currency";
import { CurrencyCacheService } from "./cache/cachedCurrencies.service";
import { ExchangeApiService } from "./api/exchangeApi.service";

const apiService = new ExchangeApiService();
const currencyCacheService = new CurrencyCacheService(new CachedCurrencyRepository());
const memoryCache = new MemoryCacheService();

export const getCurrencies = async (userId: string): Promise<Currency[]> => {
  const key = `${userId}:currencies`;

  const memCached = memoryCache.get<Currency[]>(key);
  if (memCached) return memCached;

  let currencies = await currencyCacheService.getFresh();
  if (!currencies) {
    currencies = await apiService.fetchCurrencies();
    await currencyCacheService.save(currencies);
  }

  memoryCache.set(key, currencies);
  return currencies;
};
