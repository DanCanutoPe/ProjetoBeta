import express from 'express';
import cors from 'cors';
import { routes } from './routes.js';

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

// Main App Routes
app.use(routes);

app.get('/', (req, res) => {
    return res.json({ message: 'Welcome to ProjetoBeta - No Excuses API' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
