import { Field, ID, ObjectType } from '@nestjs/graphql'


@ObjectType()
export class BaseModel {

  @Field(() => ID)
  id: string

  @Field(() => Date, { nullable: true })
  createdAt?: Date

  @Field(() => Date, { nullable: true })
  updatedAt?: Date

  @Field(() => Date, { nullable: true })
  deletedAt?: Date
}
