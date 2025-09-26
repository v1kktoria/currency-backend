export class ApiError<T = unknown> extends Error {
  constructor(
    public status: number,
    public message: string,
    public details?: T
  ) {
    super(message);
    this.name = "ApiError";
  }

  static badRequest<T = unknown>(msg: string, details?: T) {
    return new ApiError<T>(400, msg, details);
  }

  static notFound<T = unknown>(msg: string, details?: T) {
    return new ApiError<T>(404, msg, details);
  }

  static internal<T = unknown>(msg: string, details?: T) {
    return new ApiError<T>(500, msg, details);
  }
}
