import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import lostItemsRoutes from './routes/lostItems';
import foundItemsRoutes from './routes/foundItems';

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use('/api/lost-items', lostItemsRoutes);
app.use('/api/found-items', foundItemsRoutes);

// Test route
app.get('/', (_req, res) => {
  res.send('📦 Lost & Found API is up and running!');
});

export default app;

// Start server (you can also move this part to index.ts if preferred)
app.listen(port, () => {
  console.log(`🚀 Server listening at http://localhost:${port}`);
});
