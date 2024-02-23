import { Injectable } from '@nestjs/common'

import { PrismaService } from '../prismamodule/prismamodule.service'

import { CreateBetterTimeDTO } from './dto/createbettertime.dto'
import { BetterTimeModel } from './models/bettertime.model'

@Injectable()
export class BetterTimesService {

  constructor(
    private readonly prismaService: PrismaService,
  ) { }

  async create(data: CreateBetterTimeDTO, userId): Promise<BetterTimeModel> {
    return this.prismaService.betterTime.create({
      data: {
        ...data,
        userId,
      },
    })
  }

  async getByUserId(userId: string): Promise<BetterTimeModel[]> {
    return this.prismaService.betterTime.findMany({
      where: {
        userId,
      },
      include: {
        raceway: true,
        user: true,
      },
      orderBy: [{ minutes: 'asc' }, { seconds: 'asc' }, { milliseconds: 'asc' }],
    })
  }
}
