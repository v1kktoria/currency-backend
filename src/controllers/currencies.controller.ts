import { Router } from 'express';
import { getCurrencies } from '../services/currencies.service';

export const router = Router();

router.get('/', async (req, res) => {
  const currencies = await getCurrencies();
  res.json({ success: true, data: currencies });
});