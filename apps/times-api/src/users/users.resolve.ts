
import { UseGuards } from '@nestjs/common'
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CurrentUser } from '../google/currentuser.decorator'
import { GqlAuthGuard } from '../google/google.guard'

import { CreateUserDTO } from './dto/createuser.dto'
import { UserModel } from './models/user.model'
import { UsersService } from './users.service'


@Resolver(() => UserModel)
@UseGuards(GqlAuthGuard)
export class UsersResolver {

  constructor(private readonly usersService: UsersService) { }

  @Mutation(() => UserModel)
  async updateUser(
    @CurrentUser() user: CreateUserDTO,
  ): Promise<UserModel> {

    return this.usersService.updateUserData(user)
  }

  @Mutation(() => Boolean)
  async deleteUser(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.usersService.deleteById(id)
  }

  @Query(() => UserModel)
  async me(
    @CurrentUser() user: UserModel,
  ): Promise<UserModel> {
    return user
  }
}
