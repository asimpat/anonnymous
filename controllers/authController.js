const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const AppError = require('../utills/appError');
const catchAsync = require('../utills/catchAsync');

const signtoken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  const token = signtoken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    message: `signUp successful`,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { name, password } = req.body;

  // 1. check if email and password exist
  if (!name || !password) {
    return next(new AppError('Please provide email and Password', 400));
  }

  // 2. check if user exist and password is correct(by comparing)
  const user = await User.findOne({ name }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect Credentials. Try Again', 401));
  }
  // 3. if everything is ok, send the jwt to client
  const token = signtoken(user._id);
  res.status(201).json({
    status: 'success',
    token,
    message: 'Login Successfully',
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  //1.  GET THE TOKEN AND CHECK IF IT EXIST

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new AppError('you are not logged in!! Please log in to get access', 401)
    );
  }

  // 2. VERIFICATION OF THE TOKEN
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3. CHECK IF USER EXISTS
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token NO longer exist', 401)
    );
  }

  //  GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

exports.userGetMessage = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate('messages');

  if (!user) {
    return next(new AppError(`No user found with ${req.params.id} ID`, 404));
  }

  user.password = undefined;
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});
