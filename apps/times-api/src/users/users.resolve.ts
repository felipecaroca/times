
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CreateUserDTO } from './dto/createuser.dto'
import { UserModel } from './models/user.model'
import { UsersService } from './users.service'


@Resolver(() => UserModel)
export class UsersResolver {

  constructor(private readonly usersService: UsersService) { }

  @Query(() => UserModel)
  async user(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<UserModel> {
    return this.usersService.getById(id)
  }


  @Mutation(() => UserModel)
  async createUser(
    @Args('input', { type: () => CreateUserDTO }) input: CreateUserDTO,
  ): Promise<UserModel> {

    return this.usersService.create(input)
  }

  @Mutation(() => Boolean)
  async deleteUser(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<boolean> {
    return this.usersService.deleteById(id)
  }
}
