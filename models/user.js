const { Schema, model } = require('mongoose');

const usersSchema = new Schema(
    {
        username: {
            type: String, 
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match:  [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'] //regex for matching
        },
        thoughts: {
            type: Schema.Types.ObjectId,
            ref: `Thought`
        },
        friends: {
            type: Schema.Types.ObjectId,
            ref: `User`
        }
    }
)
//creating user model
const User = model(`User`, usersSchema)
//retrieves length of friends array
usersSchema.virtual(`friendCount`).get(function () {
    return this.friends.length
} )

//export model
module.exports = { User }



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
