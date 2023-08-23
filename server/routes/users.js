const router = require("express").Router();
const userController = require("../controller/users");

/**
 * Get user by id or email
 */
router.get("/:userId", userController.getUsersByID);

/**
 * update user by id
 * @method PUT
 */
router.put("/:userId", userController.putUserById);

/**
 * Update user by id
 * @method PATCH
 */
router.patch("/:userId", userController.patchUserById);

router.delete("/:userId", userController.deleteUserById);

/**
 * Get all users, include
 * - filter
 * - sort
 * - pagination
 * - select properties
 * @route /api/v1/users?sort=['by', 'name']
 * @method GET
 * @visibility Private
 */
router.get("/", userController.getUsers);

/**
 * Create a new user
 */
router.post("/", userController.postUser);

module.exports = router;
