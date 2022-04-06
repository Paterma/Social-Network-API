const router = require('express').Router();
const {
    addThought,
    getThoughts,
    updateThought,
    getThoughtById,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');


router.route('/').get(getThoughts) //.post(addThought)
router.route('/:userId').post(addThought);

router
    .route('/:thoughtId')
    .put(updateThought)
    .get(getThoughtById)
    
router
    .route('/:userId/:thoughtId')
    .delete(deleteThought);

router
    .route('/:thoughtId/reactions')
    .post(addReaction);

router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;

