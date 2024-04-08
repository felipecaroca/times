import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class TimeFromImageModel {
  @Field()
  userAlias: string

  @Field(() => Int)
  minutes: number

  @Field(() => Int)
  seconds: number

  @Field(() => Int)
  milliseconds: number
}
