const express = require('express');
const router = express.Router();
const saveData=require('../controllers/saveData');


router.get('/', (req, res) => {

  if (req.cookies && req.cookies.userid) {
    const userid = req.cookies.userid;
    if (userid) {
      res.render('user',{
        message:"Hiii "+userid
    });
    } else {
      res.render('index');
    }
  } else {
    res.render('index'); 
  }
});

router.get("/register", (req, res) => {
    res.render('register');
});

router.get("/login", (req, res) => {
    res.render('login');
});

router.get("/logout",(req,res)=>{
    res.clearCookie('userid');
    res.render('index');
})

router.get("/pay",(req,res)=>{
    if (req.cookies && req.cookies.userid) {
        const userid = req.cookies.userid;
        if (userid) {
            const userId = req.cookies.userid;
            res.render('pay', { userId });
        } else {
          res.render('index');
        }
      } else {
        res.render('index'); 
      }
    
})

router.post('/download',saveData.save );


module.exports=router;