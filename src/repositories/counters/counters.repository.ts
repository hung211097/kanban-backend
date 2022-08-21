import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Counter } from './counter.schema';
import { PROVIDE_NAMES } from '~/config/constants';

@Injectable()
export class CounterRepository {
  constructor(
    @Inject(PROVIDE_NAMES.COUNTER_MODEL)
    private counterModel: Model<Counter>,
  ) {}

  async getNextCount(id: string): Promise<number> {
    const pieceRecord = await this.counterModel.findOneAndUpdate(
      { id },
      { $inc: { sequenceValue: 1 } },
      { upsert: true, new: true, useFindAndModify: false },
    );
    return pieceRecord.sequenceValue;
  }
}
