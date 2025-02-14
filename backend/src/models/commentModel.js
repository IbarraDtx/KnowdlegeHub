const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: { type: mongoose.Schema.Types.ObjectId, ref: 'Content', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;