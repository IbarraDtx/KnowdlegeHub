const express = require('express');
const { createUser, getUsers, updateUser, deleteUser } = require('../controllers/userController')
const validate = require('../middlewares/validateMiddleware');
const { updateUserSchema } = require('../validations/validationSchemas');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', createUser);
router.get('/', protect, getUsers);
router.put('/update', protect, validate(updateUserSchema), updateUser);
router.delete('/delete', protect, deleteUser);

module.exports = router;