import { NestFactory } from '@nestjs/core'
import bodyParser from 'body-parser'

import { AppModule } from './app/app.module'

export async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(bodyParser.json({ limit: '50mb' }))
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

  await app.listen(process.env.PORT)

  console.debug(`listen on url:  ${await app.getUrl()}`)
}

bootstrap()
