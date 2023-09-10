const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const util = require('util');

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  socketPath: '/var/run/mysqld/mysqld.sock'
});

// create empty folders
const mkdir = util.promisify(fs.mkdir);

async function createFolders(email) {
  const rootFolderPath = path.resolve(__dirname, '..');
  const userFolderPath = path.join(rootFolderPath, 'projects', 'users', email);
  const assetsFolderPath = path.join(userFolderPath, 'assets');
  const folderNames = ['img', 'video', 'audio', 'models'];

  try {
    await mkdir(userFolderPath, { recursive: true });
    await mkdir(assetsFolderPath, { recursive: true });

    for (const folderName of folderNames) {
      const folderPath = path.join(assetsFolderPath, folderName);
      await mkdir(folderPath, { recursive: true });
      console.log(`Folder '${folderPath}' created successfully.`);
    }

    console.log(`Folders for user '${email}' created successfully.`);
  } catch (err) {
    console.error(`Error creating folders: ${err}`);
  }
}

// Register page
exports.register = async (req, res) => {
  const name = req.body.fname;
  const password = req.body.password;
  const email = req.body.email;
  const passwordConfig = req.body.passwordConfig;

  // Check if the email already exists in the database
  db.query('SELECT email FROM users WHERE email=?', [email], async (error, results) => {
    if (error) {
      console.log(error);
    }
    if (results.someVariable.length > 0) {
      return res.render('register', {
        message: 'That email is already taken.'
      });
    } else if (password !== passwordConfig) {
      return res.render('register', {
        message: 'Passwords do not match.'
      });
    }

    const url1 = "projects/users/"+email;
    let hashedPassword = await bcrypt.hash(password, 8);
    const status="none";
    // Insert user data into the database
    db.query('INSERT INTO users SET ?', { username: name, email: email, password: hashedPassword, url: url1, status: status }, (error, results) => {
      if (error) {
        console.log(error);
      } else {
        const data = {
            email:email,
          };
        const jsonData = JSON.stringify(data, null, 2); // The second argument is for formatting (indentation)
        const rootFolderPath = path.resolve(__dirname, '..');
        // Specify the desired file path
        const filePath = path.join(rootFolderPath, 'users', email+'.json'); // Example path
        createFolders(email);
        // Write the JSON data to the file
        fs.writeFileSync(filePath, jsonData);
        // Render a response with the 'message'
        return res.render('register', {
          message: 'User registered successfully.'
        });
      }
    });
  });
};
