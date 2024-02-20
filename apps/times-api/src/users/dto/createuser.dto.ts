import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateUserDTO {

  @Field()
  email: string

  @Field({ nullable: true })
  name?: string

  @Field()
  sub: string
}
