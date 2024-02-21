import { INestApplication } from '@nestjs/common'
import request, { Response } from 'supertest'

type GraphqlRequestInputType = {
  app: INestApplication,
  send: { query: string; variables?: unknown },
  onResponse: (res: Response) => void,
  token?: string,
}

export const graphqlRequest = ({
  app,
  send,
  onResponse,
  token,
}: GraphqlRequestInputType,
) => {
  return request(app.getHttpServer())
    .post('/graphql')
    .set('Authorization', `Bearer ${token || ''}`)
    .send(send)
    .expect(200)
    .expect(onResponse)
}
