import express from 'express';
import authRoute from './routes/authRoute.js'
import productRoute from './routes/productRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import adminRoute from './routes/adminRoute.js'
import { authMiddleware } from './middleware/authMiddleware.js';
import { adminMiddleware } from './middleware/adminMiddleware.js';
import prisma from './database/db.config.js';

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5001;

app.use('/api/auth', authRoute);
app.use('/api/admin', authMiddleware, adminMiddleware, adminRoute);
app.use('/api/product', productRoute);
app.use('/api/category', categoryRoute);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use((error, req, res, next) => {
    console.log('Global Catch', error);
    res.json({ success: false, message: error })
})

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});