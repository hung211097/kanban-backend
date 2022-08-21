import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';

import { BoardSeedingCommand } from './seed-modules/board.seeding';
import { BoardsModule } from '~/repositories/boards/boards.module';

@Module({
  imports: [CommandModule, BoardsModule],
  providers: [BoardSeedingCommand],
  exports: [BoardSeedingCommand],
})
export class SeedsModule {}
