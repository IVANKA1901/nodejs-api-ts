const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/user-controller");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../validators/user-validators");

router.post(
  "/register",
  validateBody(schemas.userAuthSchema, "missing fields"),
  ctrl.registerUser
);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post(
  "/verify",
  validateBody(schemas.emailSchema),
  ctrl.resendVerifyEmail
);

router.post(
  "/login",
  validateBody(schemas.userAuthSchema, "missing fields"),
  ctrl.loginUser
);

router.post("/logout", authenticate, ctrl.logoutUser);

router.get("/current", authenticate, ctrl.getCurrentUser);

router.patch(
  "/",
  authenticate,
  validateBody(schemas.subscriptionSchema, "missing fields"),
  ctrl.updateSubscription
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatars"),
  ctrl.updateAvatar
);

module.exports = router;
