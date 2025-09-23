import { In } from "typeorm";
import { AppDataSource } from "../config/db";
import { CachedRate } from "../entities/cachedRate";

export class CachedRateRepository {
  private repo = AppDataSource.getRepository(CachedRate);

  async getRates(base_currency: string, targets?: string[]): Promise<CachedRate[]> {
    if (targets?.length) {
      return await this.repo.findBy({
        base_currency,
        target_currency: In(targets),
      });
    }
    
    return await this.repo.findBy({ base_currency });
  }

  async saveRates(rates: CachedRate[]): Promise<CachedRate[]> {
    return await this.repo.save(rates);
  }
}
