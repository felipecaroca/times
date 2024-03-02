import { Injectable, UnauthorizedException } from '@nestjs/common'
import { OAuth2Client } from 'google-auth-library'

import { VALIDATE_TOKEN_ERRORS } from '../consts'
import { UserModel } from '../users/models/user.model'

import { RefreshTokenModel } from './models/refreshtoken.model'



@Injectable()
export class GoogleService {
  private oauthClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

  async refreshToken(refreshToken: string): Promise<RefreshTokenModel> {
    await this.oauthClient.setCredentials({
      refresh_token: refreshToken,
    })

    const res = await this.oauthClient.getAccessToken()

    return {
      accessToken: res.res?.data?.id_token,
      refreshToken: res.res?.data?.refresh_token,
    }
  }

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
      console.log(error)

      const errorCode = 'ERROR_UNKNOWN'
      const errorString = error.toString()

      VALIDATE_TOKEN_ERRORS.forEach(errorHandler => {
        if (errorString.includes(errorHandler.error))
          throw new UnauthorizedException(errorHandler.code)
      })

      throw new UnauthorizedException(errorCode)
    }
  }
}
