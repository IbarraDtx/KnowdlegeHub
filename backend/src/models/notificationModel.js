const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['comment', 'reply', 'update', 'system'], required: true },
    content: { type: String, required: true },
    read: { type: Boolean, default: false },
    link: { type: String, required: true }, //Redirigir al usuario a la notificación
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notification', notificationSchema);