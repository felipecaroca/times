
import { NestFactory } from '@nestjs/core'

import { bootstrap } from '../../src/main'

jest.mock('@nestjs/core', () => ({
  __esModule: true,
  default: jest.fn(),
  NestFactory: {
    create: jest.fn().mockResolvedValue({ listen: jest.fn(), getUrl: jest.fn() }),
  },
}))


describe('App Bootstrap', () => {
  it('it bootstraps and launches the application', async () => {
    await bootstrap()

    const factoryCreateSpy = jest.spyOn(NestFactory, 'create')

    expect(factoryCreateSpy).toHaveBeenCalled()
  })
})
