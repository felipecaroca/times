import { Global, Module } from '@nestjs/common'

import { UsersModule } from '../users/users.module'

import { GqlAuthGuard } from './google.guard'
import { GoogleService } from './google.service'

@Global()
@Module({
  imports: [UsersModule],
  providers: [GoogleService, GqlAuthGuard],
  exports: [GoogleService],
})
export class GoogleModule { }
