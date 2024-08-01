const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const keys = require('../../config/keys_prod');

const router = express.Router();

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User model
const User = require('../../models/User');

// @route GET api/users/test
// @desc Test users routes
// @access public
router.get('/test', (req, res) => {
  res.json({ msg: 'User Works' });
});

// @route POST api/users/register
// @desc Register users
// @access public
router.post('/register', async (req, res) => {  

  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    }

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      cpf: req.body.cpf,
      phone: req.body.phone,
      password: req.body.password,
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @route POST api/users/login
// @desc Login User
// @access public
router.post('/login', async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // User matched
      const payload = { _id: user._id, name: user.name, role: user.role }; 

      // Sign Token
      const token = await jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 });
      res.json({
        success: true,
        token: `Bearer ${token}`,
        role: user.role,
        _id: user._id,
      });
    } else {
      errors.password = 'Password incorrect';
      return res.status(400).json(errors);
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// @route GET api/users/current
// @desc Return current user
// @access Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(req.user);
});

module.exports = router;
