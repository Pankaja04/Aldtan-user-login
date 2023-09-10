const fs = require('fs');
const path = require('path');

exports.save=(req,res)=>{
    const userid = req.cookies.userid;
    const data=req.body.downloadedContent;
    const rootFolderPath = path.resolve(__dirname, '..');
    //update json file with access key
    const filePath =rootFolderPath+'/users/'+userid+'.json';
    const rawData = fs.readFileSync(filePath);
    const jsonData = JSON.parse(rawData);
    jsonData.code=data;
    const updatedData = JSON.stringify(jsonData, null, 2);

    fs.writeFile(filePath, updatedData, (fileError) => {
    if (fileError) {
         console.log(fileError);
    } else {
        return res.render('user',{
            message:"saved data succefully.."
            })
        }
    });
}