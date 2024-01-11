const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const adminRouter = require("./routes/admin");

const userRouter = require("./routes/User");
app.use(bodyParser.json());
app.use("/admin", adminRouter);
app.use("/user", userRouter);
console.log(adminRouter, userRouter);

const port = 3000;
app.get("/", (req, res) => {
  res.send("welcome to course server");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
