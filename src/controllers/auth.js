class AuthController {
  constructor(User, jwtAuth) {
    Object.assign(this, {User, jwtAuth});
  }

  login(req, res) {
    const {email, password} = req.body;

    const user = new this.User();

    const hash = user.createHash(password);

    return this.User
      .findOne({email, password: hash})
      .then(result => {
        let token = this.jwtAuth.sign(result);

        return res.header('Authorization', token).json(result);
      })
      .catch(err => res.status(401).send({
        error: {
          code: 401,
          type: 'Unauthorized',
          message: 'Invalid email/password supplied'
        }
      }));
  }

  signup(req, res) {
    const {email, password} = req.body;

    const user = new this.User({email, password});

    return this.User
      .findOne({email})
      .then(result => {
        if (result)
          return res.status(409).json({
            error: {
              code: 409,
              type: 'Conflict',
              message: 'Email already registered'
            }
          });

        return user.save();
      })
      .then(result => res.status(201).json(result))
      .catch(err => res.status(400).json({
        error: {
          code: 400,
          type: 'Bad Request',
          message: ''
        }
      }));

  }
}

export default AuthController;
