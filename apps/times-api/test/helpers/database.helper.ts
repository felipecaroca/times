import { PrismaService } from '../../src/prismamodule/prismamodule.service'


export const cleanDatabase = async (prisma: PrismaService) => {
  await prisma.betterTime.deleteMany()
  await prisma.raceway.deleteMany()
  await prisma.user.deleteMany()
}
