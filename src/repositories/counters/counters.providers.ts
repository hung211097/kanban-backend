import { Connection } from 'mongoose';
import { counterSchemaName, counterSchema } from './counter.schema';
import { PROVIDE_NAMES } from '~/config/constants';

export const countersProviders = [
  {
    provide: PROVIDE_NAMES.COUNTER_MODEL,
    useFactory: (connection: Connection) => connection.model(counterSchemaName, counterSchema),
    inject: [PROVIDE_NAMES.DATABASE_MONGO_CONNECTION],
  },
];
