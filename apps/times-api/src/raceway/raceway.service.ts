import { Injectable } from '@nestjs/common'

import { PrismaService } from '../prismamodule/prismamodule.service'

import { CreateRacewayDTO } from './dto/createraceway.dto'
import { RacewayModel } from './models/raceway.model'

@Injectable()
export class RacewaysService {
  constructor(private readonly prismaService: PrismaService) { }


  async create(data: CreateRacewayDTO): Promise<RacewayModel> {
    return this.prismaService.raceway.create({
      data,
    })
  }

  async getAll(): Promise<RacewayModel[]> {
    return this.prismaService.raceway.findMany({
      where: {
        deletedAt: undefined,
      },
    })
  }

  async getById(id: string): Promise<RacewayModel> {
    return this.prismaService.raceway.findFirst({
      where: {
        id,
      },
      include: {
        betterTimes: {
          include: {
            user: true,
          },
          orderBy: [
            { minutes: 'asc' },
            { seconds: 'asc' },
            { milliseconds: 'asc' }],
        },
      },
    })
  }
}
