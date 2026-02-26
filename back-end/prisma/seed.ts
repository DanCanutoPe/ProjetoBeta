import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding the gamified database...');

    // 1. Create Users
    const user1 = await prisma.user.create({
        data: {
            name: 'João',
            email: 'joao@example.com',
            password: 'password123',
            totalPoints: 500,
            currentStreak: 5,
            petHealth: 100,
        }
    });

    const user2 = await prisma.user.create({
        data: {
            name: 'Maria (Rainha do Xadrez)',
            email: 'maria@example.com',
            password: 'password123',
            totalPoints: 1200,
            currentStreak: 12,
            petHealth: 100,
        }
    });

    const user3 = await prisma.user.create({
        data: {
            name: 'Frango (Danilinho)',
            email: 'danilinho@example.com',
            password: 'password123',
            totalPoints: 10,
            currentStreak: 0,
            petHealth: 20, // O pet tá morrendo de fome
        }
    });

    // 2. Create Activities (Check-ins)
    await prisma.activity.create({
        data: {
            title: 'Leg Day',
            type: 'PHYSICAL',
            duration: 60,
            pointsEarned: 90,
            notes: 'Quase morri no leg press.',
            userId: user1.id
        }
    });

    await prisma.activity.create({
        data: {
            title: 'Partida de Xadrez (1H)',
            type: 'MENTAL',
            duration: 60,
            pointsEarned: 150,
            notes: 'Destruí o Danilinho em 10 jogadas.',
            userId: user2.id
        }
    });

    // 3. Create Taunts (Trash-Talk)
    await prisma.taunt.create({
        data: {
            senderId: user2.id,
            receiverId: user3.id,
            message: 'Vai treinar seu frango, e depois vem tentar ganhar no xadrez de novo! Faz 3 dias que você não loga!!!'
        }
    });

    console.log('Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
