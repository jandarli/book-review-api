import { Router } from 'express';
import { getBooks, insertBooks } from "../controllers/bookControllers";

const router = Router();

router.get('/books', getBooks);
router.post('/books', insertBooks);

export default router;