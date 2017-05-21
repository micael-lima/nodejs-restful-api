import express from 'express';
import jwtAuth from '../middlewares/jwt-auth';
import controller from '../controllers/products';

const router = express.Router();

router.use(jwtAuth);
router.post('/', controller.post);
router.get('/', controller.get);
router.get('/:productId', controller.getById);
router.put('/:productId', controller.update);
router.delete('/:productId', controller.remove);

export default router;
