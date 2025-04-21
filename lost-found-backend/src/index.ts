import express from 'express';
import cors from 'cors';
import foundItemRoutes from './routes/foundItems';
import lostItemRoutes from './routes/lostItems'; // optional if you're using it

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/found-items', foundItemRoutes);
app.use('/api/lost-items', lostItemRoutes); // only if you've implemented it

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
