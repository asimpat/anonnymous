const Message = require('../models/messageModel');
const catchAsync = require('../utills/catchAsync');

exports.createMessage = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.params.userId;
  const newMessage = await Message.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      message: newMessage,
    },
  });
});

exports.getAllMessage = catchAsync(async (req, res, next) => {
  const allMessage = await Message.find()

  res.status(200).json({
    status: 'success',
    length: allMessage.length,
    data: {
      allMessage,
    },
  });
});
