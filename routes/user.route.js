const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const upload = require("../middlewares/multer.middleware");
const authMiddleware = require("../middlewares/auth.middleware");
router.post(
  "/insert",
  authMiddleware,
  upload.single("user_image"),
  UserController.enterUserDetails
);
router.get("/details/:user_id", UserController.getUserDetails);
router.put("/update", authMiddleware, UserController.updateUserDetails);
router.post("/login", UserController.loginUser);
router.get("/image/:user_id", UserController.getUserImage);
router.delete("/delete/:user_id", authMiddleware, UserController.deleteUser);
module.exports = router;
