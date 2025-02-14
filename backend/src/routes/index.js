const express = require('express');
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');
const contentRoutes = require('./contentRoutes');
const savedContentRoutes = require('./savedContentRoutes');
const commentRoutes = require('./commentRoutes');
const recommendationRoutes = require('./recommendationRoutes');
const notificationRoutes = require('./notificationRoutes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/content', contentRoutes);
router.use('/saved', savedContentRoutes);
router.use('/comments', commentRoutes);
router.use('/recommendations', recommendationRoutes);
router.use('/notifications', notificationRoutes);

module.exports = router;
