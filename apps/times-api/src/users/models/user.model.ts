import { Field, ObjectType } from '@nestjs/graphql'

import { BetterTimeModel } from 'src/bettertimes/models/bettertime.model'
import { BaseModel } from 'src/global/models/base.model'

@ObjectType()
export class UserModel extends BaseModel {

  @Field()
  email: string

  @Field({ nullable: true })
  name?: string

  @Field()
  sub: string

  @Field(() => [BetterTimeModel], { nullable: 'itemsAndList' })
  betterTimes?: BetterTimeModel[]
}
