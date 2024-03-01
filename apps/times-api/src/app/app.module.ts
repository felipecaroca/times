import { join } from 'path'

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'

import { BetterTimesModule } from '../bettertimes/bettertimes.module'
import { GoogleModule } from '../google/google.module'
import { PrismaModule } from '../prismamodule/prismamodule.module'
import { RacewaysModule } from '../raceway/raceway.module'
import { UsersModule } from '../users/users.module'

import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    BetterTimesModule,
    RacewaysModule,
    GoogleModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
