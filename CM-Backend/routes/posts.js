const express = require("express");
const router = express.Router();
const Post = require("../models/Posts");

//GET all posts
router.get("/", (req, res) => {
  Post.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(404).json({ message: err });
      console.log(err);
    });
});

//GET a specific post
router.get("/:postId", (req, res) => {
  const { postId } = req.params;

  Post.find({unique: req.params.postId})
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
});

//POST a new post
router.post("/", (req, res) => {
  const { unique, messages } = req.body;
  const post = new Post({
    unique: unique,
    messages: messages,
  });

  post
    .save()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
});

//UPDATE an existing post
router.patch("/:postId", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { unique: req.params.postId },
      { $push: { messages: req.body.messages } }
    );

    res.json(updatedPost);
  } catch (error) {
    res.json({ message: err });
  }
});

//DELETE an existing post
router.delete("/:postId", (req, res) => {
  const { postId } = req.params;
  Post.findByIdAndDelete(postId)
    .then(() => {
      //Post deleted succesfully
      res.status(204);
    })
    .catch((err) => {
      //No post with that postId, throw error
      res.status(404).json({ message: err });
    });
});
module.exports = router;
