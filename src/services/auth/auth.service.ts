import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from '~/repositories/users/users.repository';
import { generateJWT } from '~/utils/jwt';
import * as bcrypt from 'bcrypt';
import { AuthDTO, LoginDTO } from './dto';
import { validateEmail } from '~/utils/validate';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const shortid = require('shortid');
// import { UserLogin } from '~/guards/jwt-auth.guard';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
  ) { }

  async register(data: AuthDTO): Promise<any> {
    const { email, password, name } = data
    if (!(email && password)) {
      throw new HttpException('Email and password is required', HttpStatus.BAD_REQUEST)
    }
    if (!validateEmail(email)) {
      throw new HttpException('Invalid email', HttpStatus.BAD_REQUEST)
    }

    const user = await this.usersRepository.findByEmail(email);
    if (user) {
      throw new HttpException('This account is already existed', HttpStatus.BAD_REQUEST)
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    await this.usersRepository.create({
      id: shortid.generate(),
      email,
      password: hashPassword,
      name: name
    });

    return {
      message: 'Success',
      status: HttpStatus.CREATED
    };
  }

  async login(data: LoginDTO): Promise<any> {
    const { email, password } = data
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new HttpException('This account is not exist', HttpStatus.BAD_REQUEST)
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST)
    }

    const token = generateJWT({
      id: user?.id,
      email: user?.email,
      name: user?.name
    });

    return {
      id: user?.id,
      email: user?.email,
      name: user?.name,
      token,
    };
  }
}
