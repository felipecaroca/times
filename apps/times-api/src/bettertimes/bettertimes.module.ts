import { Module } from '@nestjs/common'

import { UsersModule } from '../users/users.module'

import { BetterTimesResolver } from './bettertimes.resolver'
import { BetterTimesService } from './bettertimes.service'

@Module({
  imports: [UsersModule],
  providers: [BetterTimesService, BetterTimesResolver],
})
export class BetterTimesModule { }
