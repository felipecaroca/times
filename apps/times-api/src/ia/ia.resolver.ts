import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { CurrentUser } from '../google/currentuser.decorator'
import { GqlAuthGuard } from '../google/google.guard'
import { UserModel } from '../users/models/user.model'

import { TimeFromImageDTO } from './dto/time-from-image.dto'
import { TimeFromImageModel } from './models/timefromimage.model'
import { IAService } from './ia.service'

@Resolver()
@UseGuards(GqlAuthGuard)
export class IAResolver {
  constructor(
    private readonly iaService: IAService,
  ) { }

  @Mutation(() => TimeFromImageModel)
  async timeFromImage(
    @CurrentUser() user: UserModel,
    @Args('input') input: TimeFromImageDTO,
  ): Promise<TimeFromImageModel> {
    console.debug(user)

    return this.iaService.getTimeFromImgage(input)
  }
}
