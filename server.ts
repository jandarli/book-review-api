import express from 'express';
import bookRoutes from './routes/bookRoutes';

const app = express(); 
const PORT = 4001;

app.use(express.json());
app.use('/api', bookRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})


