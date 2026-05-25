const validatePost = (req, res, next) => {
  const { title, content, author } = req.body;

  if (!title || !content || !author) {
    return res.status(400).json({
      success: false,
      message: "Title, content, and author are required"
    });
  }

  next();
};

module.exports = validatePost;
