import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import route from './routes/UserRouter.js';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
const PORT = process.env.PORT;
const MONGOURL = process.env.MONGOURL;


mongoose
    .connect(MONGOURL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 20000,
        family: 4
    })
    .then(() => {
        console.log("Database connected");
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
        });
    })
    .catch((error) => console.error('Error connecting to MongoDB:', error));

app.use('/', route);
