const express=require('express');
const router=express.Router();
const TicketController=require('../controllers/ticketsController'); 


router.get('/', TicketController.get_all_tickets);

router.post('/',TicketController.post_ticket);

router.get('/:ticketId', TicketController.get_ticketbyId);

router.patch('/:ticketId',TicketController.update_ticketbyId);

router.delete('/:ticketId',TicketController.delete_ticketbyId);

module.exports=router;