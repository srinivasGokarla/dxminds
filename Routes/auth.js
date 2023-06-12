const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Failed to logout' });
        }
        res.clearCookie('sessionId');
        res.json({ message: 'Logout successful' });
      });
});

module.exports = router;