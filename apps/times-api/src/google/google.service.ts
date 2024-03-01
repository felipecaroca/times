import { Injectable, UnauthorizedException } from '@nestjs/common'
import { OAuth2Client } from 'google-auth-library'

import { UserModel } from '../users/models/user.model'

@Injectable()
export class GoogleService {
  private oauthClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

  async validateToken(token: string): Promise<UserModel> {
    try {
      const ticket = await this.oauthClient.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      })

      const payload = ticket.getPayload()

      return {
        id: '',
        sub: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
      }
    } catch (error) {
      let errorCode = 'ERROR_UNKNOWN'

      if (error.toString().includes('Token used too late'))
        errorCode = 'TOKEN_EXPIRED'

      if (error.toString().includes('Invalid token signature'))
        errorCode = 'UNAUTHORIZED'

      throw new UnauthorizedException(errorCode)
    }
  }
}
