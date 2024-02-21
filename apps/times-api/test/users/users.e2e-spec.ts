import { createUserMutation, deleteUserMutation, userQuery } from '@graphqldefs'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'

import { AppModule } from '../../src/app.module'
import { PrismaService } from '../../src/prismamodule/prismamodule.service'
import { cleanDatabase } from '../helpers/database.helper'
import { graphqlRequest } from '../helpers/supertest.request.helper'

import { usersData } from './users.data'


describe('users resolver', () => {

  let app: INestApplication
  let prisma: PrismaService
  let userId: string

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    prisma = moduleFixture.get<PrismaService>(PrismaService)

    app = moduleFixture.createNestApplication()

    await app.init()
  })

  it('createUser', () => {
    return graphqlRequest({
      app, send: {
        query: createUserMutation,
        variables: {
          input: usersData[1],
        },
      }, onResponse: ({ text }) => {
        const response = JSON.parse(text)?.data?.createUser

        userId = response.id
        expect(response.id).toBeDefined()

      },
    })
  })

  it('user', () => {
    return graphqlRequest({
      app, send: {
        query: userQuery,
        variables: {
          id: userId,
        },
      }, onResponse: ({ text }) => {
        const response = JSON.parse(text)?.data?.user

        expect(response.id).toBeDefined()
      },
    })
  })

  it('deleteUser', () => {
    return graphqlRequest({
      app,
      send: {
        query: deleteUserMutation,
        variables: {
          id: userId,
        },
      },
      onResponse: ({ text }) => {
        const response = JSON.parse(text)?.data?.deleteUser

        expect(response).toBeTruthy()
      },
    })
  })

  afterAll(async () => {
    await app.close()
    await cleanDatabase(prisma)
  })
})
