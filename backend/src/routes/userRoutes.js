const express = require('express');
const { createUser, getUsers, updateUser, deleteUser } = require('../controllers/userController')
const validate = require('../middlewares/validateMiddleware');
const { updateUserSchema } = require('../validations/validationSchemas');
const protect = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware')

const router = express.Router();

router.post('/', createUser);
router.get('/', protect, roleMiddleware(['admin']), getUsers);
router.put('/update', protect, roleMiddleware(['admin', 'editor']), validate(updateUserSchema), updateUser);
router.delete('/delete', protect, roleMiddleware(['admin']), deleteUser);

module.exports = router;