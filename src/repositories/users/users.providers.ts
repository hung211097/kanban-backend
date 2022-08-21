import { Connection } from 'mongoose';
import { userSchema, userSchemaName } from './user.schema';
import { PROVIDE_NAMES } from '~/config/constants';

export const usersProviders = [
  {
    provide: PROVIDE_NAMES.USER_MODEL,
    useFactory: (connection: Connection) => connection.model(userSchemaName, userSchema),
    inject: [PROVIDE_NAMES.DATABASE_MONGO_CONNECTION],
  },
];
