import express, { Express, Request, Response } from 'express';
import { User, ApiResponse } from '@monorepo/shared';

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {

    const user: User = {id: 'meow', name: 'chris', email: 'chris@zuant.com', createdAt: new Date()}

  res.json({ message: 'Hello from Express + TypeScript!' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
