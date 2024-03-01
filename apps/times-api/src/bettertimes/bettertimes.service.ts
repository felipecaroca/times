import { Injectable } from '@nestjs/common'

import { PrismaService } from '../prismamodule/prismamodule.service'
import { UsersService } from '../users/users.service'

import { CreateBetterTimeDTO } from './dto/createbettertime.dto'
import { BetterTimeModel } from './models/bettertime.model'

@Injectable()
export class BetterTimesService {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UsersService,
  ) { }

  async create(data: CreateBetterTimeDTO, sub: string): Promise<BetterTimeModel> {
    const user = await this.userService.getBySub(sub)

    if (!user) throw new Error('USER_NOT_FOUND')

    return this.prismaService.betterTime.create({
      data: {
        ...data,
        userId: user.id,
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
