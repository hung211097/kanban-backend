import { Module } from '@nestjs/common';
import { BoardsRepository } from './boards.repository';
import { bookingsProviders } from './boards.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [BoardsRepository, ...bookingsProviders],
  exports: [BoardsRepository],
})
export class BoardsModule {}
