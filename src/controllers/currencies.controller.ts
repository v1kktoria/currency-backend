import { Router } from 'express';
import { getCurrencies } from '../services/currencies.service';

export const router = Router();

/**
 * @openapi
 * /currencies:
 *   get:
 *     summary: Получить список поддерживаемых валют
 *     description: Возвращает список валют в формате ISO4217, кэшируемый на 1 час
 *     responses:
 *       200:
 *         description: Список валют
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       code:
 *                         type: string
 *                         example: USD
 */

router.get('/', async (req, res) => {
  const user_id = req.cookies.user_id!;
  const currencies = await getCurrencies(user_id);
  res.json({ success: true, data: currencies });
});