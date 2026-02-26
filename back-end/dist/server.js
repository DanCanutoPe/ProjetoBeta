// src/server.ts
import express from "express";
import cors from "cors";

// src/routes.ts
import { Router } from "express";

// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";
var prisma = new PrismaClient();

// src/routes.ts
var routes = Router();
routes.post("/users", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: { name, email, password }
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar usu\xE1rio" });
  }
});
routes.post("/activities", async (req, res) => {
  const { title, type, duration, proofImageUrl, userId, groupId } = req.body;
  const pointsEarned = duration ? Math.floor(duration * 1.5) : 50;
  let physicalExpInc = 0;
  let mentalExpInc = 0;
  if (type === "PHYSICAL") {
    physicalExpInc = pointsEarned;
  } else if (type === "MENTAL") {
    mentalExpInc = pointsEarned;
  }
  try {
    const activity = await prisma.activity.create({
      data: {
        title,
        type,
        // 'PHYSICAL' or 'MENTAL'
        duration,
        proofImageUrl,
        pointsEarned,
        userId,
        groupId
      }
    });
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
    res.status(500).json({ error: "Erro ao registrar check-in" });
  }
});
routes.post("/taunts", async (req, res) => {
  const { senderId, receiverId, message } = req.body;
  try {
    const taunt = await prisma.taunt.create({
      data: {
        senderId,
        receiverId,
        message
      }
    });
    res.status(201).json({ taunt, status: "Amea\xE7a enviada com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao enviar xingamento" });
  }
});
routes.get("/leaderboard", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { totalPoints: "desc" },
      select: { id: true, name: true, totalPoints: true, currentStreak: true, petHealth: true, physicalExp: true, mentalExp: true }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar ranking" });
  }
});

// src/server.ts
var app = express();
var PORT = process.env.PORT || 3333;
app.use(cors());
app.use(express.json());
app.use(routes);
app.get("/", (req, res) => {
  return res.json({ message: "Welcome to ProjetoBeta - No Excuses API" });
});
app.listen(PORT, () => {
  console.log(`\u{1F680} Server running on http://localhost:${PORT}`);
});
