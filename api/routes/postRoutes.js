const { Router } = require("express");
const getAllPosts = require("../controllers/postController/getAll");
const getByIdPosts = require("../controllers/postController/getById");
const postPosts = require("../controllers/postController/post");
const postS3Posts = require("../controllers/postController/postS3");
const deletePosts = require("../controllers/postController/delete");
const deleteS3Posts = require("../controllers/postController/deleteS3");
const updatePosts = require("../controllers/postController/update");
const updateS3Posts = require("../controllers/postController/updateS3");
const updateAddTagsPosts = require("../controllers/postController/updateAddTags");
const updateRmvTagsPosts = require("../controllers/postController/updateRmvTags");
// auth
const {
  requireAuth,
  checkUser,
  requireAuthAndIsAdmin,
} = require("../middleware/authMiddleware");
// set up multer for storing uploaded files
const utilsIMG = require("../utils/addIMG");
// route
const router = Router();

// sempre
router.get("/", getAllPosts.posts_get_all); // GET ALL
router.get("/:id", getByIdPosts.posts_get_post); // GET BY ID

// sense auth
router.patch("/addTags/:id", updateAddTagsPosts.posts_add_tags_post); // UPDATE ADD TAGS IN POSTS BY ID
router.patch("/removeTags/:id", updateRmvTagsPosts.posts_remove_tags_post); // UPDATE REMOVE TAGS IN POSTS BY ID

// image AWS S3 sense auth
router.post("/", postS3Posts.posts_create_post_S3); // CREATE POST
router.patch("/:id", updateS3Posts.posts_update_post_S3); // UPDATE BY ID
router.delete("/:id", deleteS3Posts.posts_delete_S3); // DELETE BY ID

// // image Heroku Node sense auth
// router.post(
//   "/",
//   utilsIMG.upload.single("imageUrl"),
//   postPosts.posts_create_post
// ); // CREATE POST
// router.patch(
//   "/:id",
//   utilsIMG.upload.single("imageUrl"),
//   updatePosts.posts_update_post
// ); // UPDATE BY ID
// router.delete("/:id", deletePosts.posts_delete); // DELETE BY ID

// // // amb auth
// router.patch(
//   "/addTags/:id",
//   requireAuthAndIsAdmin,
//   updateAddTagsPosts.posts_add_tags_post
// ); // UPDATE ADD TAGS IN POSTS BY ID
// router.patch(
//   "/removeTags/:id",
//   requireAuthAndIsAdmin,
//   updateRmvTagsPosts.posts_remove_tags_post
// ); // UPDATE REMOVE TAGS IN POSTS BY ID
//
// // image AWS S3 amb auth
// router.post("/", requireAuthAndIsAdmin, postS3Posts.posts_create_post_S3); // CREATE POST
// router.patch("/:id", requireAuthAndIsAdmin, updateS3Posts.posts_update_post_S3); // UPDATE BY ID
// router.delete("/:id", requireAuthAndIsAdmin, deleteS3Posts.posts_delete_S3); // DELETE BY ID
//
// // // image Heroku Node amb auth
// // router.post(
// //   "/",
// //   requireAuthAndIsAdmin,
// //   utilsIMG.upload.single("imageUrl"),
// //   postPosts.posts_create_post
// // ); // CREATE POST
// // router.patch(
// //   "/:id",
// //   utilsIMG.upload.single("imageUrl"),
// //   updatePosts.posts_update_post
// // ); // UPDATE BY ID
// // router.delete("/:id", requireAuthAndIsAdmin, deletePosts.posts_delete); // DELETE BY ID

module.exports = router;
