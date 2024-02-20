import { Field, ID, InputType, Int } from '@nestjs/graphql'

@InputType()
export class CreateBetterTimeDTO {

  @Field(() => ID)
  racewayId: string

  @Field(() => ID)
  userId: string

  @Field(() => Int)
  minutes: number

  @Field(() => Int)
  seconds: number

  @Field(() => Int)
  milliseconds: number
}
