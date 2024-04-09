import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'

import { TimeFromImageDTO } from './dto/time-from-image.dto'
import { TimeFromImageModel } from './models/timefromimage.model'
import { TimeFromImageResponse } from './interfaces'

@Injectable()
export class IAService {
  constructor(private readonly httpService: HttpService) { }

  async getTimeFromImgage(input: TimeFromImageDTO): Promise<TimeFromImageModel> {

    const { b64, mediaType, userAlias } = input

    const apiKey = `${process.env.IA_BASIC_USER_NAME}:${process.env.IA_BASIC_USER_PASS}`

    const res = await firstValueFrom(this.httpService.post<TimeFromImageResponse>(`${process.env.IA_URL || ''}/claude3`, {
      b64,
      media_type: mediaType,
      user_alias: userAlias,
    }, {
      headers: {
        Authorization: `basic ${Buffer.from(apiKey).toString('base64')}`,
        'Content-Type': 'application/json',
      },
    }))

    const { milliseconds, seconds, minutes, user_alias } = res.data

    return {
      milliseconds,
      seconds,
      minutes,
      userAlias: user_alias,
    }
  }
}
