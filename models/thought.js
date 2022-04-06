const { Schema, model} = require('mongoose');
const moment = require('moment');
const reactionsSchema = require('./reaction');

//creating thoughts schema
const thoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String, 
            required:true,
            minlength: 1,
            maxlength:280
        },
        createdAt: {
            type: Date,
            default:Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('MMMM Do YYYY, [at] hh:mm a')
        },
        username: {
            type: String, 
            required: true
        },
        reactions: [reactionsSchema]  
        ,
        
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)
//retirieving lenght of thoughts array
thoughtsSchema.virtual(`reactionCount`).get(function () {
    return this.reactions.length
})
//creating user model
const Thought = model('Thought', thoughtsSchema)
//export
module.exports = Thought 




