const { Thought, User } = require('../models');

const thoughtController = {
  // get all thoughts
  getAllThought(req, res) {
    Thought.find({})
      .populate({
        path: 'reactions',
        select: '-__v',
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: 'reactions',
        select: '-__v',
      })
      .select('-__v')
      .then((dbThoughtData) => {
        // If no thought is found, send 404
        if (!dbThoughtData) {
          return res
            .status(404)
            .json({ message: 'No thought found with this id!' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // createThought
  createThought({ body }, res) {
    Thought.create(body)
      .then(({ _id }) =>
        User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        )
      )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: 'No user found with this id!' });
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // updateThought
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res
            .status(404)
            .json({ message: 'No thought found with this id!' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // deleteThought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((deletedThought) => {
        if (!deletedThought) {
          return res
            .status(404)
            .json({ message: 'No thought found with this id!' });
        }

        return User.findOneAndUpdate(
          { username: deletedThought.username },
          { $pull: { thoughts: params.id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: 'No user found with this id!' });
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // add reaction
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res
            .status(404)
            .json({ message: 'No thought found with this id!' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete reaction
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
