import { CachedCurrencyRepository } from "../../repositories/cachedCurrency.repository";
import { Currency } from "../../types/currency";

const CACHE_TTL_MS = 60 * 60 * 1000;

export class CurrencyCacheService {
    constructor(private repo: CachedCurrencyRepository) {}

    async getFresh(): Promise<Currency[] | null> {
        const cached = await this.repo.getAll();
        if (cached.length > 0 && Date.now() - cached[0].updated_at.getTime() < CACHE_TTL_MS) {
            return cached.map(c => ({ code: c.code }));
        }
        return null;
    }

    async save(currencies: Currency[]): Promise<void> {
        await this.repo.saveAll(currencies.map(c => c.code));
    }
}
