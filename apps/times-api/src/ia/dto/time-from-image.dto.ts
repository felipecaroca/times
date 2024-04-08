import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class TimeFromImageDTO {

  @Field()
  userAlias: string

  @Field()
  b64: string

  @Field()
  mediaType: string
}
