import { Global, Module } from '@nestjs/common'

import { PrismaService } from './prismamodule.service'

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule { }
