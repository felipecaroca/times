import { Module } from '@nestjs/common'

import { RacewaysResolver } from './raceway.resolver'
import { RacewaysService } from './raceway.service'

@Module({
  providers: [RacewaysService, RacewaysResolver],
})
export class RacewaysModule { }
