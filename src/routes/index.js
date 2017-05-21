import express from 'express';
import authRoute from './auth';
import productsRoute from './products';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/products', productsRoute);

export default router;
