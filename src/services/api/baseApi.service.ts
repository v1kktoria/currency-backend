import axios, { AxiosRequestConfig } from "axios";
import { ApiError } from "../../utils/errors";

const DEFAULT_API_URL = "https://open.er-api.com/v6/latest";

export class BaseApiService {
  constructor(private baseURL: string = DEFAULT_API_URL) {}

  protected async get<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await axios.get<T>(`${this.baseURL}${path}`, config);
      return response.data;
    } catch (err: unknown) {
      if (err instanceof ApiError) throw err;
      throw ApiError.internal("Ошибка при запросе внешнего API", { message: (err as Error).message });
    }
  }
}