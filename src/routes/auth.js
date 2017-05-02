import express from 'express';
import JWTHandler from '../common/jwt-handler';
import AuthController from '../controllers/auth';
import User from '../models/user';

const router = express.Router();
const jwtHandler = new JWTHandler();
const authController = new AuthController(User, jwtHandler);

router.use((req, res, next) => {
  let {email, password} = req.body;

  if (!email || !password)
    return res.status(400).json({
      error: {
        code: 400,
        type: 'Bad Request',
        message: 'Missing required email and password'
      }
    });

  next();
});

router.post('/login', (req, res) => authController.login(req, res));
router.post('/signup', (req, res) => authController.signup(req, res));

export default router;
