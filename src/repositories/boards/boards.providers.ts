import { Connection } from 'mongoose';
import { boardSchema, boardSchemaName } from './boards.schema';
import { PROVIDE_NAMES } from '~/config/constants';

export const bookingsProviders = [
  {
    provide: PROVIDE_NAMES.BOARD_MODEL,
    useFactory: (connection: Connection) => connection.model(boardSchemaName, boardSchema),
    inject: [PROVIDE_NAMES.DATABASE_MONGO_CONNECTION],
  },
];
