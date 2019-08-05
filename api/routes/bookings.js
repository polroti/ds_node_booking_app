const express=require('express');
const router= express.Router();


//import controller
const bookingController =require( '../controllers/bookingController');

router.get('/',bookingController.bookings_get_all);

router.post('/',bookingController.bookings_post);

router.get('/:bookingId',bookingController.bookings_get_by_id);

router.delete('/:bookingId',bookingController.bookings_delete_by_id);


module.exports=router;