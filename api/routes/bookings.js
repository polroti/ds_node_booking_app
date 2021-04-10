const express = require("express");
const router = express.Router();

//import controller
const bookingController = require("../controllers/bookingController");
const checkAuth = require("../middleware/check-auth");

router.get("/", checkAuth, bookingController.bookings_get_all);

router.post("/", checkAuth, bookingController.bookings_post);

router.get("/:bookingId", checkAuth, bookingController.bookings_get_by_id);

router.delete(
  "/:bookingId",
  checkAuth,
  bookingController.bookings_delete_by_id
);

module.exports = router;
