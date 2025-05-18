import { Router } from 'express';
import { getBooks, insertBooks, getBook} from "../controllers/bookControllers";

const router = Router();

router.get('/books', getBooks);
router.get('/books/search', getBook);
router.post('/books', insertBooks);

export default router;