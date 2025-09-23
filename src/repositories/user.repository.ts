import { AppDataSource} from "../config/db";
import { User } from "../entities/user";
import { UpdateUserRequest } from "../types/user";

export class UserRepository {
  private repo = AppDataSource.getRepository(User);

  async getUser(user_id: string): Promise<User | null> {
    return await this.repo.findOneBy({ user_id });
  }

  async createUser(base_currency: string = "USD", favorites: string[] = []): Promise<User> {
    const user = this.repo.create({ base_currency, favorites});
    return await this.repo.save(user);
  }

  async updateUser(user_id: string, data: UpdateUserRequest): Promise<User | null> {
    const user = await this.repo.findOneBy({ user_id });
    if (!user) return null;

    Object.assign(user, data);

    return await this.repo.save(user);
  }
}
