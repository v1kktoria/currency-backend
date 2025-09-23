import { Router } from 'express';
import { getCurrencies } from '../services/currencies.service';

export const router = Router();

router.get('/', async (req, res) => {
  const user_id = req.cookies.user_id!;
  const currencies = await getCurrencies(user_id);
  res.json({ success: true, data: currencies });
});