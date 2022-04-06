const { Schema, Types } = require('mongoose');
const moment = require('moment');

//creating reactions scehma
const reactionsSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            minlength: 1, 
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        }, 
        createdAt: {
            type: Date, 
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMMM Do YYYY, [at] hh:mm a')
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)
//export
module.exports = reactionsSchema 
