const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Input your name!!'],
  },

  password: {
    type: String,
    required: [true, 'please provide a Password'],
    // select: false,
  },

  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
});

// userSchema.virtual('messages', {
//   ref: 'Message',
//   foreignField: 'user',
//   localField: '_id',
// });

// hashPassword
userSchema.pre('save', async function (next) {
  // run this function if password was actually modified
  if (!this.isModified('password')) return next();

  //   hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

// comparePassword
userSchema.methods.correctPassword = async function (
  candinatePassword,
  userPassword
) {
  return bcrypt.compare(candinatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
