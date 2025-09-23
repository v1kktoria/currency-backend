import { CachedRateRepository } from "../../repositories/cachedRate.repository";
import { Rate } from "../../types/rate";
import { CachedRate } from "../../entities/cachedRate";

const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

export class RateCacheService {
  constructor(private cachedRateRepo: CachedRateRepository) {}

  async getFresh(base: string, targets?: string[]): Promise<Rate[] | null> {
    const cached = await this.cachedRateRepo.getRates(base, targets);
    const now = Date.now();

    const fresh = cached.filter(r => now - r.updated_at.getTime() < CACHE_TTL_MS);

    if (!fresh.length) return null;

    return fresh.map(r => ({
      base_currency: r.base_currency,
      target_currency: r.target_currency,
      rate: r.rate,
      updated_at: r.updated_at.toISOString(),
    }));
  }
  
  async save(rates: Rate[]): Promise<void> {
    const entities: CachedRate[] = rates.map(r => {
      const cached = new CachedRate();
      cached.base_currency = r.base_currency;
      cached.target_currency = r.target_currency;
      cached.rate = r.rate;
      return cached;
    });

    await this.cachedRateRepo.saveRates(entities);
  }
}
