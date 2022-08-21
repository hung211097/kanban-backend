import { PaginateModel } from 'mongoose';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Board, BoardPartial, TaskPartial } from './boards.schema';
import { PROVIDE_NAMES } from '~/config/constants';
import isEmpty from 'lodash/isEmpty';
import * as pick from 'lodash/pick';

@Injectable()
export class BoardsRepository {
  constructor(
    @Inject(PROVIDE_NAMES.BOARD_MODEL)
    private boardModel: PaginateModel<Board>,
  ) { }

  async create(createCatDto: BoardPartial): Promise<Board> {
    const createdUser = new this.boardModel(createCatDto);
    return createdUser.save();
  }

  async findById(id: string, selector = {}): Promise<Board> {
    return this.boardModel.findOne({ id }).select(selector).lean().exec();
  }

  async updateById(id: string, data: BoardPartial): Promise<void> {
    await this.boardModel.updateOne({ id }, data).lean().exec();
  }

  async updateMany(filter: any, update: BoardPartial): Promise<void> {
    await this.boardModel.updateMany(filter, update);
  }

  async findAll(query: any, projection: any, opt: any): Promise<any> {
    const result = await this.boardModel
      .find(query, projection, opt)
      .lean()
      .exec();
    return result;
  }

  async findAllPaginate(query: any, opt: any): Promise<any> {
    const result = await this.boardModel.paginate(query, opt);
    return pick(result, ['totalPages', 'totalDocs', 'page', 'limit', 'docs']);
  }

  async findOneAndUpdate(
    filter: any,
    update: any,
    optionQuery = {},
    selector = {},
  ): Promise<Board> {
    return this.boardModel
      .findOneAndUpdate(filter, update, optionQuery)
      .select(selector)
      .lean()
      .exec();
  }

  async addTask(id: string, task: TaskPartial): Promise<any> {
    try {
      const result = await this.boardModel.findOneAndUpdate(
        { id },
        {
          $push: { tasks: task },
        },
        { new: true, projection: { _id: 0, _v: 0 } },
      );
      return result;
    } catch {
      throw new HttpException('CannotAddTask', HttpStatus.BAD_REQUEST);
    }
  }

  async updateTask(
    id: string,
    taskId: string,
    task: TaskPartial,
  ): Promise<any> {
    try {
      const result = await this.boardModel.findOneAndUpdate(
        { id, 'tasks.id': taskId },
        {
          $set: {
            'tasks.$.title': task.title,
            'tasks.$.description': task.description,
            'tasks.$.tag': task.tag,
            'tasks.$.documentLink': task.documentLink,
            'tasks.$.designLink': task.designLink,
            'tasks.$.projectLink': task.projectLink,
          },
        },
        { new: true, projection: { _id: 0, _v: 0 } },
      );
      return result;
    } catch {
      throw new HttpException('CannotUpdateTask', HttpStatus.BAD_REQUEST);
    }
  }

  async reorderTask(
    id: string,
    sourceIndex: number,
    destinationIndex: number,
  ): Promise<any> {
    try {
      const board = await this.boardModel.findOne({ id });
      const source = `tasks.${sourceIndex}`;
      const destination = `tasks.${destinationIndex}`;
      const result = await this.boardModel.findOneAndUpdate(
        { id },
        {
          $set: {
            [source]: board.tasks[destinationIndex],
            [destination]: board.tasks[sourceIndex],
          },
        },
        { new: true, projection: { _id: 0, _v: 0 } },
      );
      return result;
    } catch {
      throw new HttpException('CannotReorderTask', HttpStatus.BAD_REQUEST);
    }
  }

  async moveTask(
    id: string,
    destinationBoardId: string,
    taskId: string,
    destinationIndex: number,
  ): Promise<any> {
    try {
      const board = await this.boardModel.findOne({ id });
      const task = board.tasks.find((item) => item.id === taskId);

      await this.boardModel.updateOne(
        { id },
        {
          $pull: {
            tasks: { id: taskId },
          },
        },
      );

      const result = await this.boardModel.findOneAndUpdate(
        { id: destinationBoardId },
        {
          $push: {
            tasks: {
              $each: [task],
              $position: destinationIndex
            },
          },
        },
        { new: true, projection: { _id: 0, _v: 0 } },
      );
      return result;
    } catch (e) {
      console.log(e);
      throw new HttpException('CannotMoveTask', HttpStatus.BAD_REQUEST);
    }
  }
}
