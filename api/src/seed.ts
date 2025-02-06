import { PrismaClient } from '@prisma/client';
import { Technology } from '../src/types/technology.type';

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
        data: { ...technology1 },
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
