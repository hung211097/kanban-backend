import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { SeedsModule } from './modules/seeds/seeds.module';
import { BoardModule } from './modules/board/board.module';

@Module({
  imports: [AuthModule, SeedsModule, BoardModule],
})
export class AppModule {}
