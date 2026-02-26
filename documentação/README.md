# Documentação - ProjetoBeta (Plataforma de Hábitos e Competição Amigável)

Este projeto foi idealizado em parceria com o **Danilinho**. É inspirado no app *GymRats*, mas evoluiu para se tornar um **Aplicativo Mobile para Android** com foco em ser uma plataforma de hábitos lúdica e altamente competitiva. 

O diferencial não será apenas o registro de treinos físicos, mas também exercícios mentais (como Xadrez) e um forte apelo à interação social agressiva/divertida (Trash-Talk) para manter os amigos na linha.

## Visão Geral e Funcionalidades Core

### 1. Sistema de "Xingamento" (Trash-Talk) e Interação Social
A interação social será o grande diferencial, focando em rivalidade amigável.
- **Botão de "Cutucar" (Poke/Taunt):** Enviar notificações push provocativas ("Levanta do sofá, frango!" ou "Faz 3 dias que você não joga Xadrez!") para amigos perdendo o foco.
- **Gatilhos Automáticos:** O sistema botará lenha na fogueira avisando no grupo quando:
  - Alguém perde uma ofensiva (Streak) de muitos dias.
  - Alguém é ultrapassado no ranking.
- **Reações Tóxicas:** Curtir check-ins com emojis de "Frango", "Cérebro Pequeno" ou "Deus do Olimpo".

### 2. Gamificação Lúdica (Estilo Tamagotchi / Avatar)
- **Mascote/Avatar Dinâmico:** Se o usuário mantém sua ofensiva, o mascote fica forte/inteligente. Se falta, o mascote fica triste/gordo.
- **"Dano" no Chefe do Grupo:** Um "Monstro da Preguiça" com X de HP por semana. Cada check-in dá dano. Se não matarem no fim da semana, punição para o grupo (ex: perda de pontos).
- **Divisões Semanais (Bronze, Prata, Ouro):** Os piores do grupo caem de divisão no final da semana.

### 3. Sistema de Hábitos e Check-ins Customizáveis
O app permite rastrear múltiplas áreas do corpo e mente:
- **Tipos de Check-in:** Físico (Academia, Corrida) e Mental (Xadrez, Leitura).
- **Validação:** Foto ou registro de Tempo (Duração do exercício gera mais pontos).

## Estrutura do Projeto
- `/back-end`: API em Node.js com Prisma OS, provendo WebSockets e Rotas HTTP para o app.
- `/front-end`: (No futuro) Será desenvolvido em **React Native / Expo** para ser focado no Android.
- `/documentação`: Arquivos de planejamento, diagramas e referências.

## Próximos Passos
1. Finalizar modelagem do banco de dados (Tabelas de Taunts, Atividades e Ligas).
2. Criar a estrutura inicial do App Mobile para Android (React Native).
3. Construir as rotas de Check-in e Sistema de Ofensivas na API.

