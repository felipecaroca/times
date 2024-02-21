import { Field, ObjectType } from '@nestjs/graphql'

import { BetterTimeModel } from '../../bettertimes/models/bettertime.model'
import { BaseModel } from '../../global/models/base.model'

@ObjectType()
export class RacewayModel extends BaseModel {

  @Field()
  name: string

  @Field()
  coords: string

  @Field(() => [BetterTimeModel], { nullable: 'itemsAndList' })
  betterTimes?: BetterTimeModel[]
}
