const mongoose = require('mongoose');

const savedContentSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    savedItems: [{
        content: {type: mongoose.Schema.Types.ObjectId, ref: 'Content', required: true },
        isFavorite: {type: Boolean, default: false }, //Si el usuario lo marcó como favorito
    }]
}, { timestamps: true });

const SavedContent = mongoose.model('SavedContent', savedContentSchema);

module.exports = SavedContent;