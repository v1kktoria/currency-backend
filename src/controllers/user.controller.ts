import { Request, Response} from 'express';
import { getUser, updateUser } from '../services/user.service';

export const getUserController = async (req: Request, res: Response) => {
  const user_id = req.cookies.user_id!;
  const user = await getUser(user_id);
  res.json({ success: true, data: user });
};

export const updateUserController = async (req: Request, res: Response) => {
  const user_id = req.cookies.user_id!;
  const updatedUser = await updateUser(user_id, req.body);
  res.json({ success: true, data: updatedUser });
};
