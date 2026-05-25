const express = require("express");
const postRoutes = require("./routes/posts");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = 3000;

app.use(express.json());


app.use(logger);




app.use("/posts", postRoutes);


app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
