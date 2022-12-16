const router = require('express').Router();
// set up objects from controllers/user.js
const {
  getAllUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/user-controller');

// get, post, put, delete
