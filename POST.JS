const express = require("express");
const router = express.Router();

const validatePost = require("../middleware/validatePost");


let posts = [
  {
    id: 1,
    title: "First Blog",
    content: "This is my first blog post",
    author: "Admin"
  }
];


router.get("/", (req, res) => {
  res.json({
    success: true,
    posts
  });
});


router.get("/:id", (req, res) => {
  const post = posts.find(
    p => p.id === parseInt(req.params.id)
  );

  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post not found"
    });
  }

  res.json({
    success: true,
    post
  });
});


router.post("/", validatePost, (req, res) => {
  const { title, content, author } = req.body;

  const newPost = {
    id: posts.length + 1,
    title,
    content,
    author
  };

  posts.push(newPost);

  res.status(201).json({
    success: true,
    message: "Post created successfully",
    post: newPost
  });
});


router.put("/:id", validatePost, (req, res) => {
  const post = posts.find(
    p => p.id === parseInt(req.params.id)
  );

  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post not found"
    });
  }

  post.title = req.body.title;
  post.content = req.body.content;
  post.author = req.body.author;

  res.json({
    success: true,
    message: "Post updated successfully",
    post
  });
});


router.delete("/:id", (req, res) => {
  const postIndex = posts.findIndex(
    p => p.id === parseInt(req.params.id)
  );

  if (postIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Post not found"
    });
  }

  const deletedPost = posts.splice(postIndex, 1);

  res.json({
    success: true,
    message: "Post deleted successfully",
    deletedPost
  });
});

module.exports = router;
