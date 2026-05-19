const express = require("express");

// import functions
const {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  getArticleBySlug,
  toggleArticleStatus,
} = require("../controllers/articleController");

const router = express.Router();

// GET all + CREATE
router.route("/").get(getArticles).post(createArticle);
// UPDATE + DELETE
router.route("/:id").put(updateArticle).delete(deleteArticle);
// Toggle article status
router.patch("/:id/toggle", toggleArticleStatus);
// GET by slug
router.get("/slug/:slug", getArticleBySlug);

module.exports = router;
