const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.create({
    username,
    password,
  });
  res.json({
    message: "User created successfully",
  });
});

router.get("/courses", async (req, res) => {
  const response = await Course.find({});
  res.json({
    Courses: response,
  });
});

router.post("/course/:courseId", userMiddleware, async (req, res) => {
  const courseId = req.params.courseId;
  const username = req.headers.username;
  try {
    await User.updateOne(
      {
        username,
      },
      {
        $push: {
          purchasedCourses: courseId,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }

  res.json({
    message: "Purchase complete!",
  });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  const user = await User.findOne({
    username: req.headers.username,
  });
  const courses = await Course.find({
    _id: {
      $in: user.purchasedCourses,
    },
  });
  res.json({
    courses: courses,
  });
});

module.exports = router;
