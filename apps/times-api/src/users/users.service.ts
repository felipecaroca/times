import { Injectable } from '@nestjs/common'

import { PrismaService } from 'src/prismamodule/prismamodule.service'

import { CreateUserDTO } from './dto/createuser.dto'
import { UserModel } from './models/user.model'

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(data: CreateUserDTO): Promise<UserModel> {

    return this.prismaService.user.create({
      data,
    })
  }

  async getById(id: string): Promise<UserModel> {
    return this.prismaService.user.findFirst({
      where: {
        id,
      },
      include: {
        betterTimes: {
          include: {
            raceway: true,
          },
        },
      },
    })
  }

  async deleteById(id: string): Promise<boolean> {
    try {
      await this.prismaService.user.delete({
        where: {
          id,
        },
      })

      return true
    } catch (error) {
      console.error(error)

      throw new Error(error)
    }
  }

}
