const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const memberController = require('./controllers/memberController');
require('dotenv').config();

const app = express();

const isProduction = process.env.NODE_ENV === 'production';
const rawOrigins = (process.env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
const allowedOrigins = isProduction
  ? rawOrigins.filter(o => o.includes('.vercel.app'))
  : rawOrigins.filter(o => o.includes('localhost'));

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'), false);
  },
  credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use('/api/member', memberController);

module.exports = app;
