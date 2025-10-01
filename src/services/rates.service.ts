import { MemoryCacheService } from "./cache/memoryCache.service";
import { CachedRateRepository } from "../repositories/cachedRate.repository";
import { Rate } from "../types/rate";
import { RateCacheService } from "./cache/cahedRates.service";
import { ApiError } from "../utils/errors";
import { ExchangeApiService } from "./api/exchangeApi.service";

const apiService = new ExchangeApiService();
const rateCacheService = new RateCacheService(new CachedRateRepository());
const memoryCache = new MemoryCacheService();

export const getRates = async (userId: string, base: string, targets?: string | string[]): Promise<Rate[]> => {
  const key = `${userId}:${base}:${targets?.toString() ?? ""}`;
  const memCached = memoryCache.get<Rate[]>(key);
  if (memCached) return memCached;

  targets = targets ? (Array.isArray(targets) ? targets : targets.split(",")) : undefined;
  let rates = await rateCacheService.getFresh(base, targets);
  if (!rates) {
    rates = await fetchRates(base);
    await rateCacheService.save(rates);
  }

  rates = filterAndValidateTargets(rates, targets);
  memoryCache.set(key, rates);
  return rates;
};

const fetchRates = async (base: string): Promise<Rate[]> => {
  const apiRates = await apiService.fetchRates(base);
  const allRates = Object.entries(apiRates).map(([currency, rate]) => ({
    base_currency: base,
    target_currency: currency,
    rate,
    updated_at: new Date().toISOString(),
  }));
  return allRates;
};

const filterAndValidateTargets = (rates: Rate[], targets?: string[]): Rate[] => {
  if (!targets) return rates;
  const filtered = rates.filter(r => targets.includes(r.target_currency));
  const missing = targets.filter(t => !filtered.some(r => r.target_currency === t));
  if (missing.length > 0) throw ApiError.badRequest(`Неподдерживаемые валюты: ${missing.join(", ")}`);
  return filtered;
};