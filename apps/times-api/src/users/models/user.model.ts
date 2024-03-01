import { Field, ObjectType } from '@nestjs/graphql'

import { BetterTimeModel } from '../../bettertimes/models/bettertime.model'
import { BaseModel } from '../../global/models/base.model'

@ObjectType()
export class UserModel extends BaseModel {

  @Field()
  email: string

  @Field({ nullable: true })
  name?: string

  @Field()
  sub: string

  @Field()
  picture: string

  @Field(() => [BetterTimeModel], { nullable: 'itemsAndList' })
  betterTimes?: BetterTimeModel[]
}
