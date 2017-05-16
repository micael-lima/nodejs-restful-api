'use strict'
import jwt from '../services/jwt'
import User from '../models/user'

function login (req, res) {
  let { email, password } = req.body

  let user = new User()

  let hash = user.createHash(password)

  return User
    .findOne({ email, password: hash })
    .then(result => {
      let token = jwt.sign(result)

      res.header('Authorization', token).json(result)
    })
    .catch(() => res.status(401).send({
      error: {
        code: 401,
        type: 'Unauthorized',
        message: 'Invalid email/password supplied'
      }
    }))
}

function signup (req, res) {
  let { email, password } = req.body

  let user = new User({ email, password })

  return User
    .findOne({email})
    .then(result => {
      if (result) throw new Error({ code: 409 })

      return user.save()
    })
    .then(result => res.status(201).json(result))
    .catch(() => res.status(409).json({
      error: {
        code: 409,
        type: 'Conflict',
        message: 'Email already registered'
      }
    }))
}

export default { login, signup }
