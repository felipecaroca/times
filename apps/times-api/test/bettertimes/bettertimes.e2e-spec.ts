import { betterTimesByUserQuery, createBetterTimeMutation } from '@graphqldefs'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'

import { AppModule } from '../../src/app/app.module'
import { GqlAuthGuard } from '../../src/google/google.guard'
import { GoogleService } from '../../src/google/google.service'
import { PrismaService } from '../../src/prismamodule/prismamodule.service'
import { RacewayModel } from '../../src/raceway/models/raceway.model'
import { UserModel } from '../../src/users/models/user.model'
import { cleanDatabase } from '../helpers/database.helper'
import { graphqlRequest } from '../helpers/supertest.request.helper'
import { racewaysData } from '../raceways/raceways.data'
import { usersData } from '../users/users.data'


describe('better times resolver', () => {

  let app: INestApplication
  let raceway: RacewayModel
  let user: UserModel
  let prisma: PrismaService


  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(GoogleService)
      .useValue({ validateToken: jest.fn().mockResolvedValue(usersData[0]) })
      .compile()

    prisma = moduleFixture.get<PrismaService>(PrismaService)

    raceway = await prisma.raceway.create({ data: racewaysData[0] })
    user = await prisma.user.findFirst()

    app = moduleFixture.createNestApplication()

    await app.init()
  })

  it('createBetterTime', () => {
    return graphqlRequest({
      app, send: {
        query: createBetterTimeMutation,
        variables: {
          input: {
            racewayId: raceway.id,
            minutes: 1,
            seconds: 25,
            milliseconds: 521,
          },
        },
      }, onResponse: ({ text }) => {
        const response = JSON.parse(text)?.data?.createBetterTime

        expect(response.id).toBeDefined()
      },
    })
  })

  it('betterTimeByUser', () => {
    return graphqlRequest({
      app,
      send: {
        query: betterTimesByUserQuery,
        variables: {
          userId: user.id,
        },
      },
      onResponse: ({ text }) => {
        const response = JSON.parse(text)?.data?.betterTimesByUser

        expect(response.length).toBe(1)
      },
    })
  })

  afterAll(async () => {
    await app.close()
    await cleanDatabase(prisma)
  })
})
