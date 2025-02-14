const User = require('../models/userModel');

const createUser = async (req, res) => {
    const { username, email, password, role } = req.body;

    try{
        const user = await User.create({ username, email, password, role });
        res.status(201).json({ success: true, data: user });
    } catch(error){
        res.status(400).json({ success: false, message: error.message });
    };
}

const getUsers = async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json({ success: true, data: users });
    } catch(error){
        res.status(500).json({ success: false, message: error.message});
    };
}

const updateUser = async (req, res) => {
    try{
        const userId = req.user.id;

        let user = await User.findById(userId);
        if (!user){
            return res.status(404).json({ sucess: false, message: "Usuario no encontrado"})
        }

        const { username, email, password } = req.body;

        if (username) user.username = username;
        if (email) user.email = email;
        if (password) user.password = password;

        await user.save();

        res.status(200).json({
            sucess: true,
            data: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({ sucess: false, message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try{
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user){
            return res.status(404).json({ sucess: false, message: "Usuario no encontrado"})
        }

        await user.deleteOne();

        res.status(200).json({
            sucess: true,
            message: "Usuario eliminado exitosamente",
        });

    } catch (error) {
        res.status(500).json({ sucess: false, message: error.message });
    }
};

module.exports = { createUser, getUsers, updateUser, deleteUser };