import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';

const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
const CORSORIGIN = process.env.CORSURL || 'http://localhost:3000';
// app.use(cors());
app.use(cors({
    origin: CORSORIGIN,
    credentials: true
}));

app.use('/posts', postRoutes);

app.get('/', (req, res) => {
    res.send('Hello to Memories Api');
});

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5500;

// const mongoose = require("mongoose");

// mongoose.set('strictQuery', false);

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));