import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from "cors";

import { errorHandler } from './middlewares/error.middleware';

import authRoutes from './routes/auth-routes';
import userRoutes from './routes/user-routes';

import { MONGO_URL, PORT, CORS_ORIGINS } from './config/app.config';

const app = express();

app.use(cors());
app.options('*', cors());

app.get('/', function(req, res){
    res.send("Welcome to Alexandra Muresan website");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/v1/app/auth', authRoutes);
app.use('/v1/app/user', userRoutes);

app.use(errorHandler);

mongoose.connect(MONGO_URL, { useNewUrlParser: true })
    .then(() => {
        console.log('DB connection successful');
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Running on port ${PORT}`);
        });
    })
    .catch(console.log);