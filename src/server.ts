import express, {  Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';

//import routes
import authRoutes from './routes/auth';
import productRoutes from './routes/product';

dotenv.config();

const app: Application = express();
let port: number = 4000;

connectDB();

app.use(express.json());
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);


app.get('/', (req: Request, res: Response) => {
  res.status(200).send({success: true, message: 'Hello, Chukwudi\'s Store front API'});
});

app.listen(port, () => {
  // console.log(`Server is running on http://localhost:${port}`);
  console.log(`Server is running on port ${port}`);

});

export default app;