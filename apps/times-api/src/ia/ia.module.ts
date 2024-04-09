import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'

import { IAResolver } from './ia.resolver'
import { IAService } from './ia.service'

@Module({
  imports: [HttpModule],
  providers: [IAService, IAResolver],
})
export class IAModule { }
