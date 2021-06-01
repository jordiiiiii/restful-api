const { Router } = require("express");
const getAllTags = require("../controllers/tagController/getAll");
const getByIdTags = require("../controllers/tagController/getById");
const postTags = require("../controllers/tagController/post");
const deleteTags = require("../controllers/tagController/delete");
const updateTags = require("../controllers/tagController/update");
// auth
const {
  requireAuth,
  checkUser,
  requireAuthAndIsAdmin,
} = require("../middleware/authMiddleware");
// route
const router = Router();

// sense auth
router.get("/", getAllTags.tags_get_all); // GET ALL
router.get("/:id", getByIdTags.tags_get_tag); // GET BY ID
router.post("/", postTags.tags_create_tag); // CREATE TAG
router.delete("/:id", deleteTags.tags_delete); // DELETE BY ID
router.patch("/:id", updateTags.tags_update_tag); // UPDATE BY ID

// // amb auth
// router.post("/", requireAuthAndIsAdmin, postTags.tags_create_tag); // CREATE TAG
// router.delete("/:id", requireAuthAndIsAdmin, deleteTags.tags_delete); // DELETE BY ID
// router.patch("/:id", requireAuthAndIsAdmin, updateTags.tags_update_tag); // UPDATE BY ID

module.exports = router;
