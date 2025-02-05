import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import config from "./config/config.js";
import errorHandler from './middleware/error.js';


import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';

const app = express();

const PORT = config.PORT;
const MONGO_URL = config.MONGO_URL;


const connection = mongoose.connect(MONGO_URL);

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks', mocksRouter);

app.use(errorHandler);

app.listen(PORT,()=>console.log(`Escuchando en el puerto http://localhost:${PORT}`))


