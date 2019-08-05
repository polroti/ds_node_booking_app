const mongoose=require('mongoose');

const ticketSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    avqty:{
        type:Number
    },
    train:String
});


module.exports=mongoose.model('Ticket',ticketSchema);