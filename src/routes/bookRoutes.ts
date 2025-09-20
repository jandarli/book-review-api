import { Router } from 'express';
import { getBooks, insertBooks, getBook, insertReview, getReviews} from '../controllers/bookControllers';
import { authenticateJWT, authorizeRoles } from '../middleware/authMiddleware';

const router = Router();

router.get('/books', getBooks);
router.get('/books/search', getBook);
router.post('/books', authenticateJWT, authorizeRoles('library_admin', 'platform_admin'), insertBooks);
router.post('/books/:bookId/reviews', authenticateJWT, authorizeRoles('reader'), insertReview);
router.get('/books/reviews', getReviews);
export default router;