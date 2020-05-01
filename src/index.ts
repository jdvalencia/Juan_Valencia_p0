import dotenv from 'dotenv';
import express from 'express';
import { UserRouter } from './routers/user-router';
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';
import { Pool } from 'pg';

// environment configuration
dotenv.config();

// database configuration
export const connectionPool: Pool = new Pool({
    host: process.env['DB_HOST'],
    port: +process.env['DB_PORT'],
    database: process.env['DB_NAME'],
    user: process.env['DB_USERNAME'],
    password: process.env['DB_PASSWORD'],
    max: 5
});

// logging configuration
fs.mkdir(`${__dirname}/logs`, () => {});
const logStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' });


//Web Server Configuration
const app = express();
app.use(morgan('combined', { stream: logStream }));
app.use('/', express.json());
app.use('/users', UserRouter);
//app.use('/stats', StatsRouter);

app.listen(8080, () => {
    console.log('App running and listening on http://localhost:8080');
})