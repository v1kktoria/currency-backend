import { Request, Response} from 'express';
import { getCurrencies } from '../services/currencies.service';

export const getCurrenciesController =  async (req: Request, res: Response) => {
  const user_id = req.cookies.user_id!;
  const currencies = await getCurrencies(user_id);
  res.json({ success: true, data: currencies });
};