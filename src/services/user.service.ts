import { UserRepository } from "../repositories/user.repository";
import { UpdateUserRequest, User } from "../types/user";
import { ApiError } from "../utils/errors";


const userRepository = new UserRepository();

export const getUser = async (user_id: string): Promise<User> => {
  try {
    const user = await userRepository.getUser(user_id);

    if (!user) throw ApiError.notFound(`Пользователь не найден`);

    return user;
  } catch (err: unknown) {
    if (err instanceof ApiError) throw err;

    throw ApiError.internal("Не удалось получить данные пользователя", {
      message: (err as Error).message,
    });
  }
};

export const createUser = async (): Promise<User> => {
  try {
    return await userRepository.createUser("USD");
  } catch (err: unknown) {
    if (err instanceof ApiError) throw err;

    throw ApiError.internal("Не удалось создать пользователя", {
      message: (err as Error).message,
    });
  }
};

export const updateUser = async(user_id: string, data: UpdateUserRequest): Promise<User> => {
  try {
    const updated = await userRepository.updateUser(user_id, data);

    if (!updated) throw ApiError.notFound(`Пользователь не найден`);

    return updated;
  } catch (err: unknown) {
    if (err instanceof ApiError) throw err;

    throw ApiError.internal("Не удалось обновить данные пользователя", {
      message: (err as Error).message,
    });
  }
};
