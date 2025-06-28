import { Router } from 'express';
import { getBooks, insertBooks, getBook} from '../controllers/bookControllers';
import { authenticateJWT } from '../middleware/authMiddleware';
const router = Router();

router.get('/books', getBooks);
router.get('/books/search', getBook);
router.post('/books', authenticateJWT, insertBooks);

export default router;