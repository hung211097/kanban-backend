import * as jwt from 'jsonwebtoken';
import { config } from '~/config/config';

export const generateJWT = (data: any, expiredTime = '7d') => {
  return jwt.sign(data, config.JWT_SECRET_KEY, { expiresIn: expiredTime });
};

export const decodeJWT = (data: string) => {
  return jwt.verify(data, config.JWT_SECRET_KEY);
};
