import { Field, ID, Int, ObjectType } from '@nestjs/graphql'

import { BaseModel } from '../../global/models/base.model'
import { RacewayModel } from '../../raceway/models/raceway.model'
import { UserModel } from '../../users/models/user.model'


@ObjectType()
export class BetterTimeModel extends BaseModel {

  @Field(() => ID)
  racewayId: string

  @Field(() => RacewayModel, { nullable: true })
  raceway?: RacewayModel

  @Field(() => ID)
  userId: string

  @Field(() => UserModel, { nullable: true })
  user?: UserModel

  @Field(() => Int)
  minutes: number

  @Field(() => Int)
  seconds: number

  @Field(() => Int)
  milliseconds: number
}
