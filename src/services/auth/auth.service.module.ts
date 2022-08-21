import { Module } from '@nestjs/common';
import { UsersModule } from '~/repositories/users/users.module';
import { AuthService } from '~/services/auth/auth.service';

@Module({
  imports: [UsersModule],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthServiceModule {}
