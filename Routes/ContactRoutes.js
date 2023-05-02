const express = require("express");
const router = express.Router();
const {
  getContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenhandler");

router.use(validateToken);
router.route("/").get(getContacts);

router.route("/:id").get(getSingleContact);

router.route("/").post(createContact);

router.route("/:id").put(updateContact);

router.route("/:id").delete(deleteContact);

module.exports = router;
