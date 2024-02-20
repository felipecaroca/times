import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateRacewayDTO {
  @Field()
  name: string

  @Field()
  coords: string
}
