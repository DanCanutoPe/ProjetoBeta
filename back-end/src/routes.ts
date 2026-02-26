import { Router } from 'express';
import { prisma } from './lib/prisma.js'; // remember to use .js extension in node using ESM type

export const routes = Router();

// 1. Create User
routes.post('/users', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await prisma.user.create({
            data: { name, email, password }
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao criar usuário' });
    }
});

// 2. Check-In (Activity)
routes.post('/activities', async (req, res) => {
    const { title, type, duration, proofImageUrl, userId, groupId } = req.body;

    // Basic point calculation mapping: physical/mental efforts
    const pointsEarned = duration ? Math.floor(duration * 1.5) : 50;

    // Determine which exp to increment based on type
    let physicalExpInc = 0;
    let mentalExpInc = 0;

    if (type === 'PHYSICAL') {
        physicalExpInc = pointsEarned;
    } else if (type === 'MENTAL') {
        mentalExpInc = pointsEarned;
    }

    try {
        const activity = await prisma.activity.create({
            data: {
                title,
                type, // 'PHYSICAL' or 'MENTAL'
                duration,
                proofImageUrl,
                pointsEarned,
                userId,
                groupId
            }
        });

        // Update user points, exp pools, and streak
        await prisma.user.update({
            where: { id: userId },
            data: {
                totalPoints: { increment: pointsEarned },
                physicalExp: { increment: physicalExpInc },
                mentalExp: { increment: mentalExpInc },
                currentStreak: { increment: 1 }
            }
        });

        res.status(201).json({ activity, message: `Check-in feito! +${pointsEarned} XP` });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar check-in' });
    }
});

// 3. Send Trash-Talk (Taunt)
routes.post('/taunts', async (req, res) => {
    const { senderId, receiverId, message } = req.body;

    try {
        const taunt = await prisma.taunt.create({
            data: {
                senderId,
                receiverId,
                message
            }
        });
        // In the future this would trigger a Push Notification to the receiver
        res.status(201).json({ taunt, status: "Ameaça enviada com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao enviar xingamento' });
    }
});

// 4. Get Leaderboard (Users ordered by points)
routes.get('/leaderboard', async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            orderBy: { totalPoints: 'desc' },
            select: { id: true, name: true, totalPoints: true, currentStreak: true, petHealth: true, physicalExp: true, mentalExp: true }
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar ranking' });
    }
});
