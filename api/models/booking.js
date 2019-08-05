const mongoose=require('mongoose');

const bookingSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    ticket:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Ticket',
        required:true
    },
    quantity:{
        type:Number,
        default:1
    },
    totalPrice:{
        type:String,
        required:true
    },
    date:Date

});


module.exports=mongoose.model('Booking',bookingSchema);