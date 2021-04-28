import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes';
import cors from 'cors';
import AppError from '../../errors/AppError';

import '../typeorm';
import '../../container'

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if(err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  }
  console.log(err)

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  })
});

app.listen(3333, () => {
  console.log('Server is up 👽')
});
