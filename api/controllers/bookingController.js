const mongoose=require('mongoose');

const Booking=require('../models/booking');
const Ticket=require('../models/ticket');
const checkAuth=require('../middleware/check-auth');

exports.bookings_get_all=checkAuth, (req,res,next) =>{
    Booking.find()
    .select('ticket quantity _id')
    .populate('ticket','name price train')
    .exec()
    .then(docs=>{
        res.status(200).json({
            count:docs.length,
            booking:docs.map(doc =>{
                return{
                    _id:doc._id,
                    ticket:doc.ticket,
                    quantity:doc.quantity,
                    request:{
                        type:'GET',
                        url:'http://localhost:3000/bookings/'+doc._id
                    }
                }
            })
        });
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
       
    });

}

exports.bookings_post=checkAuth, (req,res,next) =>{
    Ticket.findById(req.body.ticket)
        .then(ticket =>{

            if(!ticket){
                return res.status(404).json({
                    message:"Product not found"
                });
            }

            const booking=new Booking({
                _id:mongoose.Types.ObjectId(),
                quantity:req.body.quantity,
                ticket:req.body.ticket
            });
            return booking.save();
        }).then(result =>{
            console.log(result);
            res.status(201).json({
                message:'Booking saved',
                createdBooking:{
                    _id:result._id,
                    ticket:result.ticket,
                    quantity:result.quantity
                },
                request:{
                    type:'GET',
                    url:'http://localhost:3000/bookings/'+result._id
                }
            });
        }).catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        }); 
}

exports.bookings_get_by_id=checkAuth, (req,res,next) =>{
    Ticket.findById(req.params.bookingId)
    .exec()
    .then(booking =>{
        res.status(200).json({
            booking:booking,
            request:{
                //to fetch all the bookings
                type:'GET',
                url:'http://localhost:3000/bookings'
            }
        });
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    });
}

exports.bookings_delete_by_id=checkAuth, (req,res,next) =>{
    Booking.remove({
        _id:req.params.bookingId
    })
    .exec()
    .then(result=>{
  
      if(!result){
          return res.status(404).json({
              message:'Booking not found!'
          });
      }
  
        res.status(200).json({
            message:'Booking cancelled',
            request:{
              type:'GET',
              url:'http://localhost:3000/bookings'
            }
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        });
    });
}