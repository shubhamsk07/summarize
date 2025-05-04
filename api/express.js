import express from 'express';
import axios from 'axios';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';

const app = express();
const ai = new GoogleGenAI({ apiKey: 'AIzaSyDEvAUdgUGdfq2dfDl7ty5WL4VNqG5DXTw' });

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

app.post('/summarize', async(req, res) => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-001',
            contents: 'Give the summary of the following text: ' + req.body.text,
        });
        console.log(response.text);
        res.json(response.text);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error summarizing text');
    }
});

// Wrap the express app to work with serverless functions
export default (req, res) => {
    app(req, res);
};