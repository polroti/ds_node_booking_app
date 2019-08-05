const express=require('express');
const router=express.Router();
const UserController=require('../controllers/userController');


const User=require('../models/user');


router.post('/register',UserController.users_post_signup);

router.post('/login',UserController.users_post_signin);

router.delete('/:userId',UserController.users_deletebyId);

router.get('/:emailId',UserController.get_userbyId);

module.exports=router;

   