import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { BoardsRepository } from '~/repositories/boards/boards.repository';
import { DATA_SEEDING } from '~/config/constants';

@Injectable()
export class BoardSeedingCommand {
  constructor(
    private readonly boardsRepository: BoardsRepository,
  ) { }

  @Command({ command: 'board:seeding', describe: 'board seeding' })
  async create() {
    await this.seedingBoard()
    console.log('board seeding config done');
  }

  async seedingBoard() {
    try {
      const promises = DATA_SEEDING.map(item => this.boardsRepository.create(item))
      await Promise.all(promises)
    }
    catch (e) {
      console.log('seeding failed', e);
    }
  }
}
