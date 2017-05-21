import mongoose from 'mongoose';
import crypto from 'crypto';

function beforeSave(next) {
  const user = this;
  const currentDate = new Date();

  if (user.isModified('password')) {
    user.password = user.createHash(user.password);
  }

  if (!user.created_at) {
    user.created_at = currentDate;
  }

  user.updated_at = currentDate;

  next();
  return false;
}

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_at: Date,
  updated_at: Date,
});

schema.methods.createHash = password => crypto.createHash('md5').update(password).digest('hex');
schema.pre('save', beforeSave);

const User = mongoose.model('User', schema);

export default User;
