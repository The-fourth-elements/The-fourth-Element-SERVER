const mongoose = require('mongoose');

const SelfKnowledgeSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description:[{
        type: Number
    }]
});

const SelfKnowledge = mongoose.model("SelfKnowledge", SelfKnowledgeSchema);
module.exports = SelfKnowledge;