import { INestApplication } from '@nestjs/common'
import request, { Response } from 'supertest'

type GraphqlRequestInputType = {
  app: INestApplication,
  send: { query: string; variables?: unknown },
  onResponse: (res: Response) => void,
}

export const graphqlRequest = ({
  app,
  send,
  onResponse,
}: GraphqlRequestInputType,
) => {
  return request(app.getHttpServer())
    .post('/graphql')
    .set('Authorization', `Bearer holisoyuntoken`)
    .send(send)
    .expect(200)
    .expect(onResponse)
}
