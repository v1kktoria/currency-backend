import { Request, Response} from 'express';
import { getRates } from '../services/rates.service';
import { getUser } from '../services/user.service';

export const getRatesController = async (req: Request, res: Response) => {
  const user_id = req.cookies.user_id!;
  const user = await getUser(user_id);

  const base = (req.query.base as string) || user.base_currency;
  const targets = req.query.targets as string | undefined;
  
  const rates = await getRates(user_id, base, targets);
  res.json({ success: true, data: rates });
};
