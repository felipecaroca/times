import { Field, ID, Int, ObjectType } from '@nestjs/graphql'

import { BaseModel } from 'src/global/models/base.model'
import { RacewayModel } from 'src/raceway/models/raceway.model'
import { UserModel } from 'src/users/models/user.model'


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
