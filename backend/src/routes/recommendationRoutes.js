const express = require('express');
const { getRecommendations } = require('../controllers/recomendationController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', protect, getRecommendations);

module.exports = router;