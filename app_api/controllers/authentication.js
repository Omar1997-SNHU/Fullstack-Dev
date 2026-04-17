const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');

// POST /api/register
const register = async (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.name) {
    return res.status(400).json({ message: 'All fields required: name, email, password' });
  }

  const user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.setPassword(req.body.password);

  try {
    await user.save();
    const token = user.generateJwt();
    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json(err);
  }
};

// POST /api/login
const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'All fields required: email, password' });
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(404).json(err);

    if (user) {
      const token = user.generateJwt();
      res.status(200).json({ token });
    } else {
      res.status(401).json(info);
    }
  })(req, res);
};

module.exports = { register, login };