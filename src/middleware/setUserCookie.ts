import { Request, Response, NextFunction } from "express";
import { createUser } from "../services/user.service";

export const setUserCookie = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.cookies.user_id) {
    const newUser = await createUser();
    res.cookie('user_id', newUser.user_id, { httpOnly: true, sameSite: 'lax' });
    req.cookies.user_id = newUser.user_id;
  }
  next();
};