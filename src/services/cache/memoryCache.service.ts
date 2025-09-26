interface CacheEntry<T> {
  value: T;
  expires: number;
}

export class MemoryCacheService {
  private cache = new Map<string, CacheEntry<unknown>>();
  private TTL = 5 * 60 * 1000;

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expires) {
      this.cache.delete(key);
      return null;
    }
    return entry.value as T;
  }

  set<T>(key: string, value: T): void {
    this.cache.set(key, { value, expires: Date.now() + this.TTL });
  }
}
