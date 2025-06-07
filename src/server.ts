import express from 'express';
import bookRoutes from './routes/bookRoutes';
import authRoutes from './routes/authRoutes';

const app = express(); 
const PORT = 4001;

app.use(express.json());
app.use('/api', bookRoutes);
app.use('/auth', authRoutes);


app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})
