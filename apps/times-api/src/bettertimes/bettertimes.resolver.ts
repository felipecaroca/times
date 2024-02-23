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
    const userId = '65ce90e0c9e52fa504eee187' // TODO: remover cuando se tenga cuenta de usuario

    return this.betterTimesService.create(input, userId)
  }

  @Query(() => [BetterTimeModel])
  async betterTimesByUser(
    @Args('userId', { type: () => ID }) userId: string,
  ): Promise<BetterTimeModel[]> {
    return this.betterTimesService.getByUserId(userId)
  }
}
