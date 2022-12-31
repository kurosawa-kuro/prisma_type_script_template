import { PrismaClient } from '@prisma/client'
import { read } from './app/services/user'
const prisma = new PrismaClient()

async function main() {
    const res = await read();

    console.dir(res, { depth: null })
}

main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })