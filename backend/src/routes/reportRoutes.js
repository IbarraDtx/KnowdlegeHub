const express = require('express');
const { createReport, getReports, updateReportStatus } = require('../controllers/reportController');
const protect = require('../middlewares/authMiddleware')

const router = express.Router();

router.post('/', protect, createReport);
router.get('/', protect, getReports);
router.put('/:id', protect, updateReportStatus);

module.exports = router;