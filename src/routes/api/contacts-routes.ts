import express from "express";

import { authenticate, isValidId, validateBody } from "../../middlewares";
import {
  addSchema,
  updateFavoriteSchema,
} from "../../validators/contact-validators";
import { contactsController } from "../../controllers/contacts-controller";

const router = express.Router();

router.get("/", authenticate, contactsController.getAll);

router.get("/:id", authenticate, isValidId, contactsController.getById);

router.post(
  "/",
  authenticate,
  validateBody(addSchema),
  contactsController.addContact
);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(addSchema),
  contactsController.updateById
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(updateFavoriteSchema),
  contactsController.updateFavorite
);

router.delete(
  "/:id",
  authenticate,
  isValidId,
  contactsController.deleteContact
);

export default router;
