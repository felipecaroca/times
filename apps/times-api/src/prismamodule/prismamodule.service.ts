
import { Injectable, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect()
    console.log('conectado a la db prisma')
    console.log(process.env.DATABASE_URL || 'no hay env')
  }
}
