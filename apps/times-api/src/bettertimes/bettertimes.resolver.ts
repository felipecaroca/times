import { UseGuards } from '@nestjs/common'
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CurrentUser } from '../google/currentuser.decorator'
import { GqlAuthGuard } from '../google/google.guard'
import { UserModel } from '../users/models/user.model'

import { CreateBetterTimeDTO } from './dto/createbettertime.dto'
import { BetterTimeModel } from './models/bettertime.model'
import { BetterTimesService } from './bettertimes.service'

@Resolver(() => BetterTimeModel)
@UseGuards(GqlAuthGuard)
export class BetterTimesResolver {
  constructor(private readonly betterTimesService: BetterTimesService) { }

  @Mutation(() => BetterTimeModel)
  async createBetterTime(
    @CurrentUser() user: UserModel,
    @Args('input', { type: () => CreateBetterTimeDTO }) input: CreateBetterTimeDTO,
  ): Promise<BetterTimeModel> {
    return this.betterTimesService.create(input, user.sub)
  }

  @Query(() => [BetterTimeModel])
  async betterTimesByUser(
    @Args('userId', { type: () => ID }) userId: string,
  ): Promise<BetterTimeModel[]> {
    return this.betterTimesService.getByUserId(userId)
  }
}
