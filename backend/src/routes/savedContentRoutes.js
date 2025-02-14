const express = require('express');
const { savedContent, toggleFavorite, getSavedContent, deleteSavedContent } = require('../controllers/savedContentController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/save', protect, savedContent);
router.post('/favorite', protect, toggleFavorite);
router.get('/', protect, getSavedContent);
router.delete('/remove', protect, deleteSavedContent);

module.exports = router;