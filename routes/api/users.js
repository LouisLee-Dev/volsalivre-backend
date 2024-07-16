const express = require('express');
const gravatar = require('gravatar');
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
  console.log('wer');
  res.json({ msg: 'User Works' })
});

// @route POST api/users/register
// @desc Register users
// @access public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
      } {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          cpf: req.body.cpf,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            });
        });
      }
    });
});

// @route POST api/users/login
// @desc Login User
// @access public
router.post('/login', (req, res) => {
  console.log('sdfsd');
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email })
    .then((user) => {
      // Check for user
      if (!user) {
        errors.email = 'User not found'
        return res.status(404).json(errors);
      }
      // Check for Password
      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            // User Matched
            const payload = { id: user.id, name: user.name };

            // Sign Token
            jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: `Bearer ${token}`,
                });
              });
          } else {
            errors.password = 'Password incorrect'
            return res.status(400).json(errors);
          }
        });
    });
});

// @route GET api/users/current
// @desc Return current user
// @access Private
router.get('/current', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json(req.user)
  });

module.exports = router;
