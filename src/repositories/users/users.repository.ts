import { Model } from 'mongoose';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User, UserPartial } from './user.schema';
import { PROVIDE_NAMES } from '~/config/constants';

@Injectable()
export class UsersRepository {
  constructor(
    @Inject(PROVIDE_NAMES.USER_MODEL)
    private userModel: Model<User>,
  ) { }

  async create(createCatDto: UserPartial): Promise<User> {
    const createdUser = new this.userModel(createCatDto);
    return createdUser.save();
  }

  async findById(id: string, selector = {}): Promise<User> {
    return this.userModel.findOne({ id }).select(selector).lean().exec();
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).lean().exec();
  }

  async updateById(id: string, data: UserPartial): Promise<void> {
    await this.userModel.updateOne({ id }, data).lean().exec();
  }
}
