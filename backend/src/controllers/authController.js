const User =require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};


const registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;

    try{
        const userExists = await User.findOne({ email });
        if (userExists) throw new Error("El usuario ya existe");

        const user = await User.create({ username, email, password, role });
        const token = await generateToken(user._id);
        res.status(201).json({ sucess: true, data: { user, token } });
    } catch(error) {
        res.status(400).json({ sucess: false, message: error.message})
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) throw new Error('Usuario no encontrado.');
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error('Contraseña incorrecta.');
  
      const token = generateToken(user._id);
      res.status(200).json({ success: true, data: { user, token } });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };
  
  module.exports = { registerUser, loginUser };