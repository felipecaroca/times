import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CreateBetterTimeDTO } from './dto/createbettertime.dto'
import { BetterTimeModel } from './models/bettertime.model'
import { BetterTimesService } from './bettertimes.service'

@Resolver(() => BetterTimeModel)
export class BetterTimesResolver {
  constructor(private readonly betterTimesService: BetterTimesService) { }

  @Mutation(() => BetterTimeModel)
  async createBetterTime(
    @Args('input', { type: () => CreateBetterTimeDTO }) input: CreateBetterTimeDTO,
  ): Promise<BetterTimeModel> {
    return this.betterTimesService.create(input)
  }

  @Query(() => [BetterTimeModel])
  async betterTimesByUser(
    @Args('userId', { type: () => ID }) userId: string,
  ): Promise<BetterTimeModel[]> {
    return this.betterTimesService.getByUserId(userId)
  }
}
