import { Module } from '@nestjs/common';
import { CounterRepository } from './counters.repository';
import { countersProviders } from './counters.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [CounterRepository, ...countersProviders],
  exports: [CounterRepository],
})
export class CountersModule {}
