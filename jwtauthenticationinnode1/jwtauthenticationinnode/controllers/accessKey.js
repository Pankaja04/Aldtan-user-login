const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

// Product key page
exports.key = async (req, res) => {
    const userid = req.body.userId;
    const rootFolderPath = path.resolve(__dirname, '..');
    //update json file with access key
    const filePath =rootFolderPath+'/users/'+userid+'.json';
    const rawData = fs.readFileSync(filePath);
    const jsonData = JSON.parse(rawData);
    const storedKey=jsonData.key;
    const key = req.body.key;
    let hashedkey = await bcrypt.hash(key, 8);
    const currentDate = new Date();
    const currentDates = new Date();

    // Add 3 months to the current date
    currentDate.setMonth(currentDate.getMonth() + 3);
    // Store the updated date in a variable
    const expDate = currentDate;
  // Check if the key already exists in the database
  db.query('SELECT status FROM users WHERE email=?', [userid], async (error, results) => {
    if(error){
        console.log(error);
    }else{
        const sql = 'UPDATE users SET `status` = ? WHERE email = ?';
        db.query(sql, [hashedkey, userid], (error, dbResults) => {
        if (error) {
            console.log(error);
        } else {
            // Database update was successful, now update the JSON file

            // Modify the data
            jsonData.key = hashedkey;
            jsonData.startDate = currentDates;
            jsonData.expDate=expDate;
            const updatedData = JSON.stringify(jsonData, null, 2);

            fs.writeFile(filePath, updatedData, (fileError) => {
            if (fileError) {
                console.log(fileError);
            } else {
                return res.render('user',{
                    message:"All done..."
                })
            }
            });
        }
        });
    }
  });
};
