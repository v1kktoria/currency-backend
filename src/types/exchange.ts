export interface ExchangeApiResponse {
  result: string;
  base_code: string;
  rates: Record<string, number>;
}