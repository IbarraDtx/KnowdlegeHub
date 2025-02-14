const Notification = require('../models/notificationModel');

//Obtener las notificaciones del usuario
const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: notifications });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Marcar notificación como leída
const markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);

        if (!notification) {
            return res.status(404).json({ success: false, message: 'Notificación no encontrada' });
        }

        if (notification.user.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: 'No autorizado' });
        }
        
        notification.read = true;
        await notification.save();

        res.status(200).json({ success: true, message: 'Notificación marcada como leída' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//Crear notificación (esto lo reciclaremos más adelante)
const createNotification = async (req, res) => {
    try {
        const notification = new Notification({ user: userId, type, content, link });
        await notification.save();

    } catch (error) {
        console.error('Error al crear la notificación:', error.message);
    }
};

module.exports = { getNotifications, markAsRead, createNotification };