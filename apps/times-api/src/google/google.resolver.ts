import { Args, Mutation, Resolver } from '@nestjs/graphql'

import { RefreshTokenModel } from './models/refreshtoken.model'
import { GoogleService } from './google.service'

@Resolver(RefreshTokenModel)
export class GoogleResolver {

  constructor(private readonly googleService: GoogleService) { }

  @Mutation(() => RefreshTokenModel)
  async refreshToken(@Args('refreshToken') refreshToken: string): Promise<RefreshTokenModel> {

    return this.googleService.refreshToken(refreshToken)
  }
}
