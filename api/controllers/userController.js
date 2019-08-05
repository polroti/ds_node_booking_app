const User=require('../models/user');
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const checkAuth=require('../middleware/check-auth');

exports.users_post_signup=(req,res,next)=>{
    User.find({
        email:req.body.email
    }).exec().then(user =>{
        if(user.length>=1){
            //409 - Conflict (user exists with email)
            res.status(409).json({
                messsge:'User Exists!'
            });

        }else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.status(500).json({ 
                        error:err
                    });
                }else{
                    const user=new User({
                        _id:mongoose.Types.ObjectId(),
                        name:req.body.name,
                        email:req.body.email,
                        password:hash,
                        nic:req.body.nic
                    });
                    user.save().then(result => {
                        console.log(result);
                        res.status(201).json({
                            messsge:'User created',
                            createdUser:result
                        });
                    }).catch(err=>{
                        console.log(err);
                        res.status(500).json({
                            error:err
                        });
                    });
                }
        })
        }

    })
    
}

exports.users_post_signin=(req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user =>{
        if(user.length <1){
            return res.status(401).json({
                message:'Auth Failed!'
            });
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(err){
                return res.status(401).json({
                    message:'Auth Failed'
                });
            }
            if(result){
                //password is correct
                const token =jwt.sign({
                    email:user[0].email,
                    userId:user[0]._id
                },process.env.JWT_KEY,
                {
                    expiresIn:"2h"
                },
                
                );
                return res.status(200).json({
                    message:'Auth Success',
                    token:token
                });
            }
            res.status(401).json({
                message:'Auth failed'
            });

        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
}

exports.users_deletebyId=(req,res,next)=>{
    const id =req.params.userId;
    User.remove(
        {
            _id:id
        }
        ).exec()
        .then(result =>{res.status(200).json(result)}
        )
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
}

exports.get_userbyId=(req,res,next)=>{
    User.find({email:req.params.emailId})
    .exec()
    .then(result=>{
        res.status(200).json(result);
    })
    .catch();
}