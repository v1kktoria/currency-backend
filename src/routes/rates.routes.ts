import { Router } from "express";
import { getRatesController } from "../controllers/rates.controller";

const router = Router();

/**
 * @openapi
 * /rates:
 *   get:
 *     summary: Получить курсы валют
 *     parameters:
 *       - name: base
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           example: USD
 *         description: Базовая валюта (по умолчанию из настроек пользователя)
 *       - name: targets
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           example: EUR,GBP,JPY
 *         description: Список валют через запятую
 *     responses:
 *       200:
 *         description: Успешный ответ с курсами валют
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - base_currency: USD
 *                   target_currency: EUR
 *                   rate: 0.93
 *                   updated_at: "2025-09-20T12:34:56Z"
 */
router.get("/", getRatesController);

export default router;

