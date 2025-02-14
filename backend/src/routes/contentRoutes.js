const express = require('express');
const { createContent, getContentById, updateContent, deleteContent, getAllContent, simpleSearchContent } = require('../controllers/contentController');
const protect = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware')

const router = express.Router();

//CRUD de contenidos
router.post('/', protect, upload.single('file'), roleMiddleware(['admin', 'editor']), createContent);
router.get('/', getAllContent);
router.get('/:id', getContentById);
router.put('/:id', protect, roleMiddleware(['admin', 'editor']), updateContent);
router.delete('/:id', protect, roleMiddleware(['admin']), deleteContent);

//Busqueda avanzada de contenidos
router.get('/search/:query?', protect, simpleSearchContent);

module.exports = router;