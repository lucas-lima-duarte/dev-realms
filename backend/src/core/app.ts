import express from 'express';
import mongoose from 'mongoose';
import userRoutes from '../routes/user.routes';

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);

mongoose
    .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dev-realms')
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

export default app;