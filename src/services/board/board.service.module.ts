import { Module } from '@nestjs/common';
import { BoardsModule } from '~/repositories/boards/boards.module';
import { UsersModule } from '~/repositories/users/users.module';
import { CountersModule } from '~/repositories/counters/counters.module';
import { BoardService } from './board.service';

@Module({
  imports: [BoardsModule, UsersModule, CountersModule],
  providers: [BoardService],
  exports: [BoardService]
})
export class BoardServiceModule { }
