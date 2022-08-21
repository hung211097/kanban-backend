import { Module } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { usersProviders } from './users.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [UsersRepository, ...usersProviders],
  exports: [UsersRepository],
})
export class UsersModule {}
