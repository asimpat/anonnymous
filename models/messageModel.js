const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: [true, 'Input a message!!'],
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'user must have a message'],
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

messageSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name',
  });
  next();
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
