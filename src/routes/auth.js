import express from 'express';
import controller from '../controllers/auth';

const router = express.Router();

router.use((req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: {
        code: 400,
        type: 'Bad Request',
        message: 'Missing required email and password',
      },
    });
  }

  next();
  return false;
});

router.post('/login', controller.login);
router.post('/signup', controller.signup);

export default router;
