const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/seeds');

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
            minlenght: 1, 
            maxLenght: 280
        },
        username: {
            type: String,
            required: true
        }, 
        createdAt: {
            type: Date, 
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    }
)
//export
module.exports = { reactionsSchema }




// **Reaction** (SCHEMA ONLY)

// * `reactionId`
//   * Use Mongoose's ObjectId data type
//   * Default value is set to a new ObjectId

// * `reactionBody`
//   * String
//   * Required
//   * 280 character maximum

// * `username`
//   * String
//   * Required

// * `createdAt`
//   * Date
//   * Set default value to the current timestamp
//   * Use a getter method to format the timestamp on query

// **Schema Settings**:

// This will not be a model, but rather will be used as the `reaction` field's subdocument schema in the `Thought` model.
