const User = require('./user');
const Thought = require('./thought');

module.exports = { User, Thought };


// * `friends`
//   * Array of `_id` values referencing the `User` model (self-reference)
