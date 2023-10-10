const express = require("express");
const app = express();
const { sequelize } = require("./config/db");
const userRouter = require("./routes/user.route");
app.use(express.json());

app.use("", userRouter);

sequelize
  .sync()
  .then(() => {
    app.listen(process.env.DB_PORT, async () => {
      console.log("Connected to DB");
      console.log(`Server is running at ${process.env.DB_PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
