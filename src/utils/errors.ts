export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public details?: any
  ) {
    super(message);
    this.name = "ApiError";
  }

  static badRequest(msg: string, details?: any) {
    return new ApiError(400, msg, details);
  }

  static notFound(msg: string, details?: any) {
    return new ApiError(404, msg, details);
  }

  static internal(msg: string, details?: any) {
    return new ApiError(500, msg, details);
  }
}
