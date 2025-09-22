import { Router } from 'express';
import { getUser, updateUser } from '../services/user.service';

export const router = Router();

router.get('/', async (req, res) => {
  const user_id = req.cookies.user_id!;
  const user = await getUser(user_id);
  res.json({ success: true, data: user });
});

router.put('/', async (req, res) => {
  const user_id = req.cookies.user_id!;
  const updatedUser = await updateUser(user_id, req.body);
  res.json({ success: true, data: updatedUser });
});
