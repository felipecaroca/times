import { Injectable } from '@nestjs/common'

import { PrismaService } from '../prismamodule/prismamodule.service'

import { CreateUserDTO } from './dto/createuser.dto'
import { UserModel } from './models/user.model'

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getBySub(sub: string): Promise<UserModel> {
    return this.prismaService.user.findFirst({
      where: {
        sub,
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

  async updateUserData(input: CreateUserDTO): Promise<UserModel> {
    const { email, name, sub, picture } = input

    return this.prismaService.user.upsert({
      where: {
        email,
      },
      create: {
        email, name, sub, picture,
      },
      update: {
        email, name, sub, picture,
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
