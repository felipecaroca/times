import { Field, ObjectType } from '@nestjs/graphql'

import { BetterTimeModel } from 'src/bettertimes/models/bettertime.model'
import { BaseModel } from 'src/global/models/base.model'

@ObjectType()
export class RacewayModel extends BaseModel {

  @Field()
  name: string

  @Field()
  coords: string

  @Field(() => [BetterTimeModel], { nullable: 'itemsAndList' })
  betterTimes?: BetterTimeModel[]
}
