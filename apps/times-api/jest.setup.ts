import mongoose from 'mongoose'

import { usersData } from './test/users/users.data'



const runMongo = async (cb: (mongo: mongoose.Mongoose) => void) => {
  const mongoUri = process.env.DATABASE_URL

  const mongo = await mongoose.connect(mongoUri)

  await cb(mongo)

  await mongo.disconnect()
}

beforeAll(async () => {
  process.env.DATABASE_URL = `${process.env.DATABASE_URL}_test`
  await runMongo(async mongo => await mongo.connection.db.collection('User').insertOne(usersData[0]))
})

afterAll(async () => {
  await runMongo(async mongo => await mongo.connection.db.collection('User').drop())
})
