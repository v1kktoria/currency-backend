import { Router } from "express";
import { getCurrenciesController } from "../controllers/currencies.controller";

const router = Router();

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
router.get("/", getCurrenciesController);

export default router;