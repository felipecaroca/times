import { createRacewayMutation, racewayQuery, racewaysQuery } from '@graphqldefs'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'

import { AppModule } from '../../src/app.module'
import { PrismaService } from '../../src/prismamodule/prismamodule.service'
import { cleanDatabase } from '../helpers/database.helper'
import { graphqlRequest } from '../helpers/supertest.request.helper'
import { racewaysData } from '../raceways/raceways.data'


describe('raceways resolver', () => {

  let app: INestApplication
  let prisma: PrismaService
  let racewayId: string


  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    prisma = moduleFixture.get<PrismaService>(PrismaService)

    app = moduleFixture.createNestApplication()

    await app.init()
  })

  it('createRaceway 1', () => {
    return graphqlRequest({
      app, send: {
        query: createRacewayMutation,
        variables: {
          input: racewaysData[0],
        },
      }, onResponse: ({ text }) => {
        const response = JSON.parse(text)?.data?.createRaceway

        racewayId = response.id
        expect(response.id).toBeDefined()
      },
    })
  })

  it('createRaceway 2', () => {
    return graphqlRequest({
      app, send: {
        query: createRacewayMutation,
        variables: {
          input: racewaysData[1],
        },
      }, onResponse: ({ text }) => {
        const response = JSON.parse(text)?.data?.createRaceway

        expect(response.id).toBeDefined()
      },
    })
  })

  it('raceways', () => {
    return graphqlRequest({
      app,
      send: {
        query: racewaysQuery,

      },
      onResponse: ({ text }) => {
        const response = JSON.parse(text)?.data?.raceways

        expect(response.length).toBe(2)
      },
    })
  })

  it('raceway', () => {
    return graphqlRequest({
      app,
      send: {
        query: racewayQuery,
        variables: {
          id: racewayId,
        },
      },
      onResponse: ({ text }) => {

        const response = JSON.parse(text)?.data?.raceway

        expect(response).toBeDefined()
        expect(response.id).toBe(racewayId)
      },
    })
  })


  afterAll(async () => {
    await app.close()
    await cleanDatabase(prisma)
  })
})
