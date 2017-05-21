import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'awesomerestfulapi';

function sign(payload = {}, expires = '7d') {
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: expires,
  });

  return `Bearer ${token}`;
}

function verify(token, callback) {
  jwt.verify(token, jwtSecret, (err, decoded) => {
    callback(err, decoded);
  });
}

export default { sign, verify };
