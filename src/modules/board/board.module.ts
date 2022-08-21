import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardServiceModule } from '~/services/board/board.service.module';

@Module({
  imports: [BoardServiceModule],
  controllers: [BoardController],
})
export class BoardModule {}
