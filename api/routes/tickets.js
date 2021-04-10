const express = require("express");
const router = express.Router();
const TicketController = require("../controllers/ticketsController");
const checkAuth = require("../middleware/check-auth");

router.get("/", TicketController.get_all_tickets);

router.post("/", checkAuth, TicketController.post_ticket);

router.get("/:ticketId", TicketController.get_ticketbyId);

router.patch("/:ticketId", checkAuth, TicketController.update_ticketbyId);

router.delete("/:ticketId", checkAuth, TicketController.delete_ticketbyId);

module.exports = router;
