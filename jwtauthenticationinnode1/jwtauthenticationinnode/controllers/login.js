const mysql=require('mysql');
const bcrypt=require('bcryptjs');
const fs = require('fs');
const path = require('path');


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST, 
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    socketPath: '/var/run/mysqld/mysqld.sock'
  });

exports.login=(req,res)=>{
    const email=req.body.email;
    const rootFolderPath = path.resolve(__dirname, '..');
    //update json file with access key
    const filePath =rootFolderPath+'/users/'+email+'.json';
    const rawData = fs.readFileSync(filePath,  'utf8');
    const jsonData = JSON.parse(rawData);
    const storedKey=jsonData.key;
    const storedDate=jsonData.expDate;
    const code=jsonData.code;
   // we can use htat code-> const {fname,password}=req.body;

   db.query('SELECT email,password,url,status FROM users WHERE email=?',[email],async (error,results)=>{
    

    if(results.length>0){
        const storedHashedPassword = results[0].password;
        const url=results[0].url;
        const storedHashedKey=results[0].status;
         // Assuming you have the entered password in a variable
        const enteredPassword = req.body.password;
    
        // Compare the entered password with the stored hash
        bcrypt.compare(enteredPassword, storedHashedPassword, (error, isMatch) => {
            if (error) {
                console.log(error);

            } else if (isMatch) {
                // Passwords match
              
                    if (storedHashedKey===storedKey) {
                        // Key match
                        const currentDate = new Date();
                        const providedDate = new Date(storedDate);
                        if (providedDate) {
                            if(currentDate.getFullYear()===providedDate.getFullYear()){
                                if(providedDate.getMonth()>currentDate.getMonth()){
                                    res.cookie('userid',email);
                                    return res.render('user',{
                                        message:"You can use Software because you alreday buy product key",
                                        code:code,
                                        id:email
                                    })
                                }else{
                                    const status="none";
                                    const sql = 'UPDATE users SET `status` = ? WHERE email = ?';
                                    db.query(sql, [status, email], (error, dbResults) => {
                                    if (error) {
                                        console.log(error);
                                    } else {
                                        res.cookie('userid',email);
                                        return res.render('test',{
                                        message:"Your key is old to buy a new key"
                                    })
                                    }
                                    });
                                    
                                }
                            }else if(currentDate.getFullYear()< providedDate.getFullYear()){
                                if(providedDate.getMonth()>currentDate.getMonth()){
                                    res.cookie('userid',email);
                                    return res.render('user',{
                                        message:"You can use Software because you alreday buy product key",
                                        code:code,
                                        id:email
                                    })
                                }else{
                                    const status="none";
                                    const sql = 'UPDATE users SET `status` = ? WHERE email = ?';
                                    db.query(sql, [status, email], (error, dbResults) => {
                                    if (error) {
                                        console.log(error);
                                    } else {
                                        res.cookie('userid',email);
                                        return res.render('test',{
                                        message:"Your key is old to buy a new key"
                                    })
                                    }
                                    });
                                }
                            }else{
                                res.cookie('userid',email);
                                return res.render('test',{
                                message:"Something went wrong.."
                            })
                            }
                            
                        } 
                    }else if(storedHashedKey==="none"){
                        res.cookie('userid',email);
                        return res.render('test',{
                            message:"You have to buy a new key"
                        })
                    }
                    else {
                        return res.render('404',{
                            message:"Contact this number.. 0710866859"
                        })
                    }

            } else {
                // Passwords don't match
                return res.render('login',{
                    message:"password is don't match"
                })
            }
        });
    }
    else{
        return res.render('login',{
            message:"Email is don't match"
        })
    }
   })
}