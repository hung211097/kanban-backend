import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { decodeJWT } from '~/utils/jwt';
import { Request } from 'express';

export interface UserLogin {
  id: string;
  token: string;
  name: string;
}

export interface UserRequest extends Request {
  user: UserLogin;
}

const validateRequest = (req: Request): boolean => {
  try {
    const bearerHeader = req.headers.authorization;

    if (!bearerHeader) {
      return false;
    }

    const bearer = bearerHeader.split(' ');
    if (bearer.length < 2) {
      return false;
    }
    const bearerToken = bearer[bearer.length - 1];

    const user = decodeJWT(bearerToken);
    if (!user) {
      return false;
    }
    Object.assign(req, {
      user,
    });
    return true;
  } catch (e) {
    return false;
  }
};

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const valid = validateRequest(request);
    if (!valid) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }
    return valid;
  }
}
