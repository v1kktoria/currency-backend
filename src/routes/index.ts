import { Router } from 'express';
import currenciesRouter from "./currencies.routes";
import userRouter from "./user.routes";
import ratesRouter from "./rates.routes";
import { setUserCookie } from '../middleware/setUserCookie';

export const router = Router();

router.use(setUserCookie);
router.use('/user', userRouter);
router.use('/currencies', currenciesRouter);
router.use('/rates', ratesRouter);
