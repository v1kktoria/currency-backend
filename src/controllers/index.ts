import { Router } from 'express';
import { router as userRouter } from './user.controller';
import { router as currenciesRouter } from './currencies.controller';
import { router as ratesRouter } from './rates.controller';
import { setUserCookie } from '../middleware/setUserCookie';

export const router = Router();

router.use(setUserCookie);
router.use('/user', userRouter);
router.use('/currencies', currenciesRouter);
router.use('/rates', ratesRouter);