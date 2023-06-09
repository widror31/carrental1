const mongoose =require('mongoose');
const Schema = mongoose.Schema;
mongoose.set("strictQuery", false);

const contactSchema = new Schema ({
    name: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    message: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Contact', contactSchema);