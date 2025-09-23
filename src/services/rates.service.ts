import { RatesApiService } from "./api/ratesApi.service";
import { MemoryCacheService } from "./cache/memoryCache.service";
import { CachedRateRepository } from "../repositories/cachedRate.repository";
import { Rate } from "../types/rate";
import { RateCacheService } from "./cache/cahedRates.service";

const apiService = new RatesApiService();
const rateCacheService = new RateCacheService(new CachedRateRepository());
const memoryCache = new MemoryCacheService();

export const getRates = async (userId: string, base: string, targets?: string | string[]): Promise<Rate[]> => {
  const key = `${userId}:${base}:${targets?.toString() ?? ""}`;
  const memCached = memoryCache.get<Rate[]>(key);
  if (memCached) return memCached;

  const targetArray = Array.isArray(targets) ? targets : targets?.split(",") ?? undefined;
  let rates = await rateCacheService.getFresh(base, targetArray);

  if (!rates) {
    const apiRates = await apiService.fetchRates(base);
    const finalTargets = targetArray ?? Object.keys(apiRates);

    rates = finalTargets.map((currency) => ({
      base_currency: base,
      target_currency: currency,
      rate: apiRates[currency],
      updated_at: new Date().toISOString(),
    }));

    await rateCacheService.save(rates);
  }

  memoryCache.set(key, rates);
  return rates;
};
