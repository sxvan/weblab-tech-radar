import { PrismaClient } from '@prisma/client';
import { Technology } from '../src/types/technology.type';
import { User } from './types/user.type';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    // Create some technologies
    const technology1: Omit<Technology, 'id'> = {
        name: 'Technologie',
        description: 'Beschreibung',
        category: 'TECHNIQUES',
        classification: 'ADOPT',
        classificationDescription: 'CRAZY',
        createdAt: new Date(),
        changedAt: new Date(),
        publishedAt: null,
    };

    await prisma.technology.create({
        data: technology1,
    });

    const adminUser: Omit<User, 'id'> = {
        email: 'admin.admin@gmail.com',
        name: 'Admin Admin',
        passwordHash: await bcrypt.hash('admin', 10),
        role: 'CTO',
    };

    const user: Omit<User, 'id'> = {
        email: 'user.user@gmail.com',
        name: 'User User',
        passwordHash: await bcrypt.hash('user', 10),
        role: 'EMPLOYEE',
    };

    await prisma.user.createMany({
        data: [user, adminUser],
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
