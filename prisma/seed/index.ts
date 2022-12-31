import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt';

const prisma = new PrismaClient()

import Users from './data/users';
// const Posts = require('./data/Posts');

interface User {
    id: number,
    name: string,
    email: string,
    password: string,
    avatar?: string,
    createdAt: Date,
    updatedAt: Date,
}

async function runSeeders() {

    // Users
    await deleteMany()

    await seed_users()


    // Posts
    // await Promise.all(
    //     Posts.map(async (post: any) =>
    //         prisma.post.upsert({
    //             where: { id: post.id },
    //             update: {},
    //             create: post,
    //         })
    //     )
    // );
}

async function seed_users() {
    // console.log(await bcrypt.hash('password', 10))
    await Promise.all(
        Users.map(async (user: User) =>
            await prisma.user.create({
                data: {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    avatar: user.avatar,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                }
            })
        )
    );
}


async function deleteMany() {
    const deleteUsers = prisma.user.deleteMany({})

    // The transaction runs synchronously so deleteUsers must run last.
    await prisma.$transaction([deleteUsers])
}

runSeeders()
    .catch((e) => {
        console.error(`There was an error while seeding: ${e}`);
        process.exit(1);
    })
    .finally(async () => {
        console.log('Successfully seeded database. Closing connection.');
        await prisma.$disconnect();
    });