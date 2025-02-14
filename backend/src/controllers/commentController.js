const Comment = require('../models/commentModel');
const Content = require('../models/Content')
const { createNotification } = require('./notificationController');

//Agregar un comentario
const addComment = async (req, res) => {
    try {
        const { contentId, text, rating } = req.body;
        const userId = req.user.id;

        //Verificamos que el contenido exista
        const contentExists = await Content.findById(contentId);
        if (!contentExists) {
            return res.status(404).json({ success: false, message: 'Contenido no encontrado' });
        }

        //Creamos el comentario
        const comment = new Comment({ content: contentId, user: userId, text, rating });
        await comment.save();
        await createNotification(userId, 'comment', `Has comentado en ${contentExists.title}`, `/content/${contentId}`);

        res.status(201).json({ success: true, data: comment });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Obtener comentarios de un contenido
const getComments = async (req, res) => {
    try {
        const  { contentId } = req.params;
        const comments = await Comment.find({ content: contentId }).populate('user', 'username');

        res.status(200).json({ success: true, data: comments });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Eliminar un comentario (solo el usuario que lo creó o un admin)
const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user.id;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ success: false, message: 'Comentario no encontrado' });

        }

        //Permitir la eliminacion solo al usuario que lo creo o un admin
        if (comment.user.toString() !== userId && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: 'No autorizado para eliminar este comentario' });
        }

        await comment.deleteOne();
        res.status(200).json({ success: true, message: 'Comentario eliminado exitosamente' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addComment, getComments, deleteComment };