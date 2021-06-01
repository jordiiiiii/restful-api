const { Router } = require("express");
const getUsers = require("../controllers/userController/getAll");
const getByIdUsers = require("../controllers/userController/getById");
const postUsers = require("../controllers/userController/post");
const deleteUsers = require("../controllers/userController/delete");
const updateUsers = require("../controllers/userController/update");
// auth
const {
  requireAuth,
  checkUser,
  requireAuthAndIsAdmin,
} = require("../middleware/authMiddleware");
// route
const router = Router();

// sense auth
router.get("/", getUsers.users_get_all); // GET ALL
router.get("/:id", getByIdUsers.users_get_user); // GET BY ID
router.post("/", postUsers.users_create_user); // CREATE USER
router.delete("/:id", deleteUsers.users_delete); // DELETE BY ID
router.patch("/:id", updateUsers.users_update_user); // UPDATE BY ID

// // amb auth
// router.post("/", requireAuthAndIsAdmin, postUsers.users_create_user); // CREATE USER
// router.delete("/:id", requireAuthAndIsAdmin, deleteUsers.users_delete); // DELETE BY ID
// router.patch("/:id", requireAuthAndIsAdmin, updateUsers.users_update_user); // UPDATE BY ID

module.exports = router;
