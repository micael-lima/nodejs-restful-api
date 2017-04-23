import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'awesomerestfulapi';

class JWTAuth {
  sign(payload = {}, expires = 1440) {
    return jwt.sign(payload, jwtSecret, {
      expiresIn: expires
    });
  }

  verify(req, res, next) {
    let token = req.headers['authorization'];

    if (token) {
      jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) return res.status(400).json();

        req.decoded = decoded;

        next();
      });
    } else {
      return res.status(401).json();
    }
  }
}

export default JWTAuth;
