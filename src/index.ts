import { db } from "./utils/db";

async function main() {
    const allUsers = await db.user.findMany({
        include: {
            posts: true,
            profile: true,
        },
    })
    console.dir(allUsers, { depth: null })
}

main()
    .catch((e) => {
        throw e
    })
    .finally(async () => {
        await db.$disconnect()
    })