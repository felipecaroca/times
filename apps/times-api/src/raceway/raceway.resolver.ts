import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'

import { CreateRacewayDTO } from './dto/createraceway.dto'
import { RacewayModel } from './models/raceway.model'
import { RacewaysService } from './raceway.service'


@Resolver(() => RacewayModel)
export class RacewaysResolver {

  constructor(private readonly racewaysService: RacewaysService) { }

  @Query(() => [RacewayModel])
  async raceways(): Promise<RacewayModel[]> {

    return this.racewaysService.getAll()
  }

  @Query(() => RacewayModel)
  async raceway(@Args('id', { type: () => ID }) id: string): Promise<RacewayModel> {
    return this.racewaysService.getById(id)
  }

  @Mutation(() => RacewayModel)
  async createRaceway(
    @Args('input', { type: () => CreateRacewayDTO }) input: CreateRacewayDTO,
  ): Promise<RacewayModel> {
    return this.racewaysService.create(input)
  }
}
