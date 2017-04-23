import mongoose from 'mongoose';
import crypto from 'crypto';

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

schema.pre('save', function (next) {
  let user = this;
  let hash = crypto.createHash('md5').update(user.password).digest("hex");

  if (!user.isModified('password'))
    return next();

  user.password = hash;

  next();
});

schema.methods.createHash = (password) => {
  return crypto.createHash('md5').update(password).digest("hex");
};

const User = mongoose.model('User', schema);

export default User;
