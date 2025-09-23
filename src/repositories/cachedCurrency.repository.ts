import { AppDataSource } from "../config/db";
import { CachedCurrency } from "../entities/cachedCurrency";

export class CachedCurrencyRepository {
  private repo = AppDataSource.getRepository(CachedCurrency);

  async getAll(): Promise<CachedCurrency[]> {
    return await this.repo.find();
  }

  async saveAll(codes: string[]): Promise<CachedCurrency[]> {
    await this.repo.clear();
    const entities = codes.map((code) => this.repo.create({ code }));
    return await this.repo.save(entities);
  }
}