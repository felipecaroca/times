import { Module } from '@nestjs/common'

import { BetterTimesResolver } from './bettertimes.resolver'
import { BetterTimesService } from './bettertimes.service'

@Module({
  providers: [BetterTimesService, BetterTimesResolver],
})
export class BetterTimesModule { }
