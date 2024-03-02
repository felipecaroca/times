import { Global, Module } from '@nestjs/common'

import { UsersModule } from '../users/users.module'

import { GqlAuthGuard } from './google.guard'
import { GoogleResolver } from './google.resolver'
import { GoogleService } from './google.service'

@Global()
@Module({
  imports: [UsersModule],
  providers: [GoogleService, GqlAuthGuard, GoogleResolver],
  exports: [GoogleService],
})
export class GoogleModule { }
