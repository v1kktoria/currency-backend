import { db } from "../config/db";
import { User, UpdateUserRequest } from "../types/user";

export class UserRepository {
   async getUser(user_id: string): Promise<User | null> {
    const result = await db.query<User>(
      'SELECT * FROM users WHERE user_id = $1',
      [user_id]
    );
    return result.rows[0] || null;
  }

  async createUser(base_currency: string = "USD", favorites: string[] = []): Promise<User> {
    const result = await db.query<User>(
      `INSERT INTO users (base_currency, favorites, created_at, updated_at)
       VALUES ($1, $2, NOW(), NOW())
       RETURNING *`,
      [base_currency, favorites]
    );
    return result.rows[0];
  }

  async updateUser(user_id: string, data: UpdateUserRequest): Promise<User | null> {
    const result = await db.query<User>(
      `UPDATE users
       SET base_currency = COALESCE($1, base_currency),
           favorites = COALESCE($2, favorites),
           updated_at = NOW()
       WHERE user_id = $3
       RETURNING *`,
      [data.base_currency ?? null, data.favorites ?? null, user_id]
    );
    return result.rows[0] || null;
  }
}
