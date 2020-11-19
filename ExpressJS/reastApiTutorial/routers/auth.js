const express = require("express");
const {
  register,
  getUser,
  login,
  logout,
  imageUpload,
  forgotPassword,
} = require("../controllers/auth");
const { getAccessToRoutes } = require("../middlewares/authorization/auth");
const profileImageUpload = require("../middlewares/libraries/profileImageUpload");

// api/auth
const router = express.Router();

router.post("/register", register);
router.get("/profile", getAccessToRoutes, getUser);
router.post("/login", login);
router.get("/logout", getAccessToRoutes, logout);
router.post(
  "/upload",
  [getAccessToRoutes, profileImageUpload.single("profile_image")],
  imageUpload
);
router.post("/forgotPassword", forgotPassword);

module.exports = router;
