import express from "express";

import { userControllers } from "../../controllers/user-controller";
import { authenticate, upload, validateBody } from "../../middlewares";
import {
  emailSchema,
  subscriptionSchema,
  userAuthSchema,
} from "../../validators/user-validators";

const router = express.Router();

router.post(
  "/register",
  validateBody(userAuthSchema),
  userControllers.registerUser
);

router.get("/verify/:verificationToken", userControllers.verifyEmail);

router.post(
  "/verify",
  validateBody(emailSchema),
  userControllers.resendVerifyEmail
);

router.post("/login", validateBody(userAuthSchema), userControllers.loginUser);

router.post("/logout", authenticate, userControllers.logoutUser);

router.get("/current", authenticate, userControllers.getCurrentUser);

router.patch(
  "/",
  authenticate,
  validateBody(subscriptionSchema),
  userControllers.updateSubscription
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatars"),
  userControllers.updateAvatar
);

export default router;
