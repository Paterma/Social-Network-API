const { Schema, model } = require('mongoose');

const usersSchema = new Schema(
    {
        username: {
            type: String, 
            required: true, 
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match:  [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/] //regex for matching
        },
        thoughts: {
            type: Schema.Types.ObjectId,
            ref: `Thought`
        },
        friends: {
            type: Schema.Types.ObjectId,
            ref: `User`
        }
    },
    {
        toJSON: {
            virtuals: true,
            // getters: true
        },
        id: false
    }
)

//retrieves length of friends array
usersSchema.virtual(`friendCount`).get(function () {
    return this.friends.length
} )
//creating user model
const User = model(`User`, usersSchema)
//export model
module.exports =  User



// * `username`
//   * String
//   * Unique
//   * Required
//   * Trimmed

// * `email`
//   * String
//   * Required
//   * Unique
//   * Must match a valid email address (look into Mongoose's matching validation)

// * `thoughts`
//   * Array of `_id` values referencing the `Thought` model

// * `friends`
//   * Array of `_id` values referencing the `User` model (self-reference)

// **Schema Settings**:

// Create a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.
