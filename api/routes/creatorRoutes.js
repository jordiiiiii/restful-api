const { Router } = require("express");
const getAllCreators = require("../controllers/creatorController/getAll");
const getByIdCreators = require("../controllers/creatorController/getById");
const postCreators = require("../controllers/creatorController/post");
const deleteCreators = require("../controllers/creatorController/delete");
const updateCreators = require("../controllers/creatorController/update");
// auth
const {
  requireAuth,
  checkUser,
  requireAuthAndIsAdmin,
} = require("../middleware/authMiddleware");
// route
const router = Router();

// sense auth
router.get("/", getAllCreators.creators_get_all); // GET ALL
router.get("/:id", getByIdCreators.creators_get_creator); // GET BY ID
router.post("/", postCreators.creators_create_creator); // CREATE CREATOR
router.delete("/:id", deleteCreators.creators_delete); // DELETE BY ID
router.patch("/:id", updateCreators.creators_update_creator); // UPDATE BY ID

// // amb auth
// router.post("/", requireAuthAndIsAdmin, postCreators.creators_create_creator); // CREATE CREATOR
// router.delete("/:id", requireAuthAndIsAdmin, deleteCreators.creators_delete); // DELETE BY ID
// router.patch("/:id", requireAuthAndIsAdmin, updateCreators.creators_update_creator); // UPDATE BY ID

module.exports = router;
