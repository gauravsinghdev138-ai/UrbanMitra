import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import issueRoutes from './routes/issueRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';


dotenv.config();
console.log("🔍 Loaded MONGO_URI:", process.env.MONGO_URI); // ✅ add this

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes); // ✅ Now /api/auth/login and /register will work
app.use('/api/issues', issueRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.error("❌ DB Connection Failed:", err));
