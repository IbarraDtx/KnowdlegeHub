const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    reporter : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reportedContent : { type: mongoose.Schema.Types.ObjectId, required: true },
    contentType : { type: String, required: true },
    reason : { type: String, required: true},
    status : { type: String, enum: ['pending', 'resolved'], default: 'pending' },
    createdAt : { type: Date, default: Date.now },
})

module.exports = mongoose.model('Report', reportSchema);