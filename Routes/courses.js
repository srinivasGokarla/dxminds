const express = require('express');
  const router = express.Router();
  

  const Course = require('../models/course');
  
  router.get('/courses', async (req, res) => {
    try {
      const courses = await Course.find();
      res.json(courses);
    } catch (err) {
      console.error('Error fetching courses:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const { title, description, price, tutorId } = req.body;
  
     
      const course = new Course({
        title,
        description,
        price,
        tutor: tutorId,
      });
  
 
      const createdCourse = await course.save();
  
      res.status(201).json({ message: 'Course created successfully', course: createdCourse });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create course' });
    }
  });
  

  router.put('/:id', async (req, res) => {
    try {
      const { title, description, price } = req.body;
      const courseId = req.params.id;
  
      const course = await Course.findById(courseId);
  
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }
  
  
      course.title = title;
      course.description = description;
      course.price = price;
  
      const updatedCourse = await course.save();
  
      res.json({ message: 'Course updated successfully', course: updatedCourse });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update course' });
    }
  });
  
  router.delete('/:id', async (req, res) => {
    try {
      const courseId = req.params.id;
  
      const deletedCourse = await Course.findByIdAndRemove(courseId);
  
      if (!deletedCourse) {
        return res.status(404).json({ error: 'Course not found' });
      }
  
      res.json({ message: 'Course deleted successfully', course: deletedCourse });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete course' });
    }
  });
  
  module.exports = router;