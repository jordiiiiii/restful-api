const { Router } = require("express");
const logoutUsers = require("../controllers/authController/logout");
const registerUsers = require("../controllers/authController/register");
const loginUsers = require("../controllers/authController/login");
const getAllUsers = require("../controllers/authController/getAll");
const getByIdUsers = require("../controllers/authController/getById");
const deleteUsers = require("../controllers/authController/delete");
const updateUsers = require("../controllers/authController/updateReadPosts");
// auth
const {
  requireAuth,
  checkUser,
  requireAuthAndIsAdmin,
} = require("../middleware/authMiddleware");
// route
const router = Router();

router.get("/logout", logoutUsers.logout_get);
router.post("/signup", registerUsers.signup_post);
router.post("/login", loginUsers.login_post);
router.get("/login/user", requireAuth, getByIdUsers.users_get_user_nuxt); // SECOND REQUEST NUXT AUTH

// sense auth
router.get("/users", getAllUsers.users_get_all); // GET ALL
router.get("/users/:id", getByIdUsers.users_get_user); // GET BY ID
router.delete("/users/:id", deleteUsers.user_delete); // DELETE BY ID
router.patch("/users/addReadPost/:id", updateUsers.users_update_read_post_user); // UPDATE READ POSTS BY ID

// amb auth
// router.get("/users", requireAuthAndIsAdmin, getAllUsers.users_get_all); // GET ALL
// router.get("/users/:id", requireAuthAndIsAdmin, getByIdUsers.users_get_user); // GET BY ID
// router.delete("/users/:id", requireAuthAndIsAdmin, deleteUsers.user_delete); // DELETE BY ID
// router.patch(
//   "/users/addReadPost/:id",
//   requireAuth,
//   updateUsers.users_update_read_post_user
// ); // UPDATE READ POSTS BY ID

module.exports = router;
