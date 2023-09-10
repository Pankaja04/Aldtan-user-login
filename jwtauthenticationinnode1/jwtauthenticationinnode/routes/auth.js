const express=require('express');
const authController=require('../controllers/auth');
const logincontroler=require('../controllers/login');
const accessKey=require('../controllers/accessKey');

const router=express.Router();

router.post('/register',authController.register );
router.post('/accesskey',accessKey.key);
router.post('/login',logincontroler.login);
module.exports=router;