import mongoose from 'mongoose';
import { PROVIDE_NAMES } from '~/config/constants';
import { config } from '~/config/config';

export const databaseProviders = [
  {
    provide: PROVIDE_NAMES.DATABASE_MONGO_CONNECTION,
    useFactory: (): Promise<typeof mongoose> => mongoose.connect(config.MONGO_DB),
  },
];
