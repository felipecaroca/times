import { NestFactory } from '@nestjs/core'

import { AppModule } from './app/app.module'

export async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  await app.listen(process.env.PORT)

  console.debug(`listen on url  ${await app.getUrl()}`)
}

bootstrap()
