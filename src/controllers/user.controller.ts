import { Router } from 'express';
import { getUser, updateUser } from '../services/user.service';

export const router = Router();

/**
 * @openapi
 * /user:
 *   get:
 *     summary: Получить настройки пользователя
 *     responses:
 *       200:
 *         description: Настройки текущего пользователя
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 base_currency: "USD"
 *                 favorites: ["EUR", "GBP"]
 *                 created_at: "2025-09-20T12:00:00Z"
 *                 updated_at: "2025-09-21T15:30:00Z"
 */
router.get('/', async (req, res) => {
  const user_id = req.cookies.user_id!;
  const user = await getUser(user_id);
  res.json({ success: true, data: user });
});

/**
 * @openapi
 * /user:
 *   post:
 *     summary: Обновить настройки пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               base_currency:
 *                 type: string
 *                 example: USD
 *               favorites:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["EUR", "GBP"]
 *     responses:
 *       200:
 *         description: Обновленные настройки пользователя
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 base_currency: "USD"
 *                 favorites: ["EUR", "GBP"]
 *                 created_at: "2025-09-20T12:00:00Z"
 *                 updated_at: "2025-09-22T09:45:00Z"
 */
router.post('/', async (req, res) => {
  const user_id = req.cookies.user_id!;
  const updatedUser = await updateUser(user_id, req.body);
  res.json({ success: true, data: updatedUser });
});
