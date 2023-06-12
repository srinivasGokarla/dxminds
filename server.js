const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost/elearning-platform', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

const Course = require('./models/course');
const User = require('./models/user');

const authRoutes = require('./Routes/auth');
const courseRoutes = require('./Routes/courses');

app.use('/auth', authRoutes);
app.use('/courses', courseRoutes);


app.post('/cart', async (req, res) => {
    try {
      const courseId = req.body.courseId;
      const userId = req.session.userId;
  
      const course = await Course.findById(courseId);
  
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }

      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      user.cart.push(course);
      await user.save();
  
      res.json({ message: 'Course added to cart' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add course to cart' });
    }
  });

  app.post('/checkout', async (req, res) => {
    try {
      const userId = req.session.userId;

      const user = await User.findById(userId).populate('cart');
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      user.cart = [];
      await user.save();
  
      res.json({ message: 'Checkout completed' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to complete checkout' });
    }
  });
  
  app.get('/purchased-courses', async (req, res) => {
    try {
      const userId = req.session.userId;
  
      const user = await User.findById(userId).populate('purchasedCourses');
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json({ purchasedCourses: user.purchasedCourses });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch purchased courses' });
    }
  });
  
app.listen(2345, () => {
  console.log('Server is running on port 2345');
});