const express = require("express");

const ctrl = require("../../controllers/contacts-controller");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../validators/contact-validators");

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:id", authenticate, isValidId, ctrl.getById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema, `missing fields`),
  ctrl.addContact
);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateById
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema, `missing field favorite`),
  ctrl.updateFavorite
);

router.delete("/:id", authenticate, isValidId, ctrl.deleteContact);

module.exports = router;
