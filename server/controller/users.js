const User = require("../models/User");
const userService = require("../service/user");

const getUsers = async (req, res, next) => {
  /**
   * TODO: filter, sort, pagination, select
   */

  try {
    const users = await userService.findUsers();
    return res.status(200).json(users);
  } catch (e) {
    next(e);
  }
};
const getUsersByID = (req, res, next) => {};
const postUser = (req, res, next) => {};
const putUserById = (req, res, next) => {};
const patchUserById = (req, res, next) => {};
const deleteUserById = (req, res, next) => {};

module.exports = {
  getUsers,
  getUsersByID,
  postUser,
  putUserById,
  patchUserById,
  deleteUserById,
};
