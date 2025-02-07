const moongose = require('mongoose');

const contentSchema = new moongose.Schema({
    title: {type: String, required: true},
    description : {type: String, required: true},
    type: {
        type: String,
        enum: ['video', 'article', 'documentation', 'note', 'project'],
        required: true
    },

    content: {type: String, required: true},
    tags: [{ type: String }],
    category: { type: String, required: true },
    createdBy: { type: moongose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Content = moongose.model('Content', contentSchema);
module.exports = Content;