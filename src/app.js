// src/app.js
import express from "express";
import cors from 'cors'
import "dotenv/config";
import routes from "./routes/index.js";
import { errorHandler, notFound } from "./middlewares/error.js";

const app = express();
app.use(express.json());

// ----- CORS (permite cookie httpOnly) -----
const allowed = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map(s => s.trim());

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowed.includes(origin)) return cb(null, true);
    return cb(new Error('CORS not allowed'));
  },
  credentials: true, // ← necessário para cookie
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
}));
app.options('*', cors()); // preflight
// ------------------------------------------

app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

export default app;
