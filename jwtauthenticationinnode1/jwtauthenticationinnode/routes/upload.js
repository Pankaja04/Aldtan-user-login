// routes/uploadRoute.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userid = req.cookies.userid;
        cb(null, path.join(__dirname, '..', 'projects', 'users',userid , 'assets','img'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

router.post('/', upload.single('file'), (req, res) => {
    const userid = req.cookies.userid;
    const rootFolderPath = path.resolve(__dirname, '..');
    //update json file with access key
    const filePath =rootFolderPath+'/users/'+userid+'.json';
    const rawData = fs.readFileSync(filePath,  'utf8');
    const jsonData = JSON.parse(rawData);
    const code=jsonData.code;
    if (!req.file) {
        return res.render('user', {
            message: 'upload Not completed',
            code:code,
            id:userid
          });
    }
    return res.render('user', {
        message: 'upload successfully.',
        code:code,
        id:userid
      });
});

module.exports = router;
