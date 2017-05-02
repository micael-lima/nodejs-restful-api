import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'awesomerestfulapi';

class JWTHandler {
  sign(payload = {}, expires = 1440) {
    let token = jwt.sign(payload, jwtSecret, {
      expiresIn: expires
    });

    return `Bearer ${token}`;
  }

  verify(token, callback) {
    jwt.verify(token, jwtSecret, (err, decoded) => {
      callback(err, decoded);
    });
  }
}

export default JWTHandler;
