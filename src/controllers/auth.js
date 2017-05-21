import jwt from '../services/jwt';
import User from '../models/user';

function login(req, res) {
  const { email, password } = req.body;

  const user = new User();

  const hash = user.createHash(password);

  return User
    .findOne({ email, password: hash })
    .then((result) => {
      const token = jwt.sign(result);

      res.header('Authorization', token).json(result);
    })
    .catch(() => res.status(401).send({
      error: {
        code: 401,
        type: 'Unauthorized',
        message: 'Invalid email/password supplied',
      },
    }));
}

function signup(req, res) {
  const { email, password } = req.body;

  const user = new User({ email, password });

  return User
    .findOne({ email })
    .then((result) => {
      if (result) throw new Error({ code: 409 });

      return user.save();
    })
    .then(result => res.status(201).json(result))
    .catch(() => res.status(409).json({
      error: {
        code: 409,
        type: 'Conflict',
        message: 'Email already registered',
      },
    }));
}

export default { login, signup };
