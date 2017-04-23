import express from 'express';
import JWTAuth from '../middlewares/jwt-auth';
import AuthController from '../controllers/auth';
import User from '../models/user';

const router = express.Router();
const jwtAuth = new JWTAuth();
const authController = new AuthController(User, jwtAuth);

router.use((req, res, next) => {
  let {email, password} = req.body;

  if (!email || !password)
    return res.status(400).json();

  next();
});

router.post('/login', (req, res) => authController.login(req, res));
router.post('/signup', (req, res) => authController.signup(req, res));

export default router;
