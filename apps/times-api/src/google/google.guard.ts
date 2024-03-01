import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

import { GoogleService } from './google.service'

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private googleService: GoogleService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const { req } = ctx.getContext()
    const token = req.headers.authorization?.split(' ')[1]

    if (!token)
      return false

    const user = await this.googleService.validateToken(token)

    req.user = user

    return !!req.user

  }
}
