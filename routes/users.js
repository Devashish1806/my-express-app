const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// Database URL

const MONGODB_URL = "mongodb://localhost:27017";
// Connecting Database through mongoose(ORM For Mongodb)
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Error in connecting database: ", err);
  });

// Creating Schema for Posts, then it will
// be used in creating Model

const PostSchema = new mongoose.Schema({
  name: String,
  date: {
    type: Date,
    default: Date.now(),
  },
});

const postModel = new mongoose.model("PostModel", PostSchema);

/* GET users listing. */
// For creating Posts
router.post("/", async (req, res) => {
  const post = new postModel(req.body);
  await post.save();
  res.status(201).send("Successfully created");
});

// For Fetching Post
router.get("/", async (req, res) => {
  try {
    // Adding Pagination
    const limitValue = req.query.limit || 2;
    const skipValue = req.query.skip*limitValue || 0;
    const posts = await postModel.find().limit(limitValue).skip(skipValue);
    res.status(200).send(posts);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
