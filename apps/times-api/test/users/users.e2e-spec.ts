import { deleteUserMutation } from '@graphqldefs'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'

import { AppModule } from '../../src/app/app.module'
import { GoogleService } from '../../src/google/google.service'
import { PrismaService } from '../../src/prismamodule/prismamodule.service'
import { cleanDatabase } from '../helpers/database.helper'
import { graphqlRequest } from '../helpers/supertest.request.helper'

import { usersData } from './users.data'


describe('users resolver', () => {

  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(GoogleService)
      .useValue({ validateToken: jest.fn().mockResolvedValue(usersData[0]) })
      .compile()

    prisma = moduleFixture.get<PrismaService>(PrismaService)

    app = moduleFixture.createNestApplication()

    await app.init()
  })

  it('deleteUser', async () => {
    const user = await prisma.user.findFirst()

    return graphqlRequest({
      app,
      send: {
        query: deleteUserMutation,
        variables: {
          id: user.id,
        },
      },
      onResponse: ({ text }) => {
        const response = JSON.parse(text)?.data?.deleteUser

        expect(response).toBeTruthy()
      },
    })
  })

  it('deleteUser', () => {
    return graphqlRequest({
      app,
      send: {
        query: deleteUserMutation,
        variables: {
          id: 'userId',
        },
      },
      onResponse: ({ text }) => {

        const response = JSON.parse(text)?.errors[0]?.message

        expect(response).toBeDefined()
      },
    })
  })

  afterAll(async () => {
    await app.close()
    await cleanDatabase(prisma)
  })
})
