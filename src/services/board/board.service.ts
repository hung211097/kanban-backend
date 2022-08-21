import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BoardsRepository } from '~/repositories/boards/boards.repository';
import { CounterRepository } from '~/repositories/counters/counters.repository';
import { UsersRepository } from '~/repositories/users/users.repository';
import {
  CreateTaskDTO,
  ReorderTaskDTO,
  MoveTaskDTO,
} from '~/modules/board/dto';

const COUNTER_ID = 'BOARDS';

@Injectable()
export class BoardService {
  constructor(
    private readonly boardsRepository: BoardsRepository,
    private readonly counterRepository: CounterRepository,
    private readonly userRepository: UsersRepository,
  ) { }

  async getBoards(): Promise<any> {
    const board = this.boardsRepository.findAll(
      {},
      { _id: 0, _v: 0 },
      {
        sort: {
          id: 1,
        },
      },
    );
    return board;
  }

  async createTask(
    userId: string,
    boardId: string,
    data: CreateTaskDTO,
  ): Promise<any> {
    const board = this.boardsRepository.findById(boardId);
    if (!board) {
      throw new HttpException('Invalid board', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new HttpException('Invalid user', HttpStatus.BAD_REQUEST);
    }

    const id = await this.counterRepository.getNextCount(COUNTER_ID);

    const payload = {
      id: id + '',
      owner: {
        id: userId,
        name: user?.name,
      },
      ...data,
    };

    const result = await this.boardsRepository.addTask(boardId, payload);
    return result;
  }

  async updateTask(
    userId: string,
    boardId: string,
    taskId: string,
    data: CreateTaskDTO,
  ): Promise<any> {
    const board = this.boardsRepository.findById(boardId);
    if (!board) {
      throw new HttpException('Invalid board', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new HttpException('Invalid user', HttpStatus.BAD_REQUEST);
    }

    const result = await this.boardsRepository.updateTask(
      boardId,
      taskId,
      data,
    );
    return result;
  }

  async reorderTask(
    userId: string,
    boardId: string,
    data: ReorderTaskDTO,
  ): Promise<any> {
    const board = this.boardsRepository.findById(boardId);
    if (!board) {
      throw new HttpException('Invalid board', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new HttpException('Invalid user', HttpStatus.BAD_REQUEST);
    }

    const result = await this.boardsRepository.reorderTask(
      boardId,
      data.sourceIndex,
      data.destinationIndex,
    );
    return result;
  }

  async moveTask(
    userId: string,
    boardId: string,
    desinationBoardId: string,
    taskId: string,
    data: MoveTaskDTO,
  ): Promise<any> {
    const board = this.boardsRepository.findById(boardId);
    if (!board) {
      throw new HttpException('Invalid board', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new HttpException('Invalid user', HttpStatus.BAD_REQUEST);
    }

    const result = await this.boardsRepository.moveTask(
      boardId,
      desinationBoardId,
      taskId,
      data.destinationIndex,
    );
    return result;
  }
}
