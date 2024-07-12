var express = require('express');
var cors = require('cors');
var multer = require('multer'); //multer is used for file upload and getting uploaded file's info
const upload = multer(); //setting multer up
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

//ensure the name inside upload.single is the same as name in your html tag that you have referred to for file upload 
app.post('/api/fileanalyse', upload.single('upfile'), (req,res) => {
  const fileName = req.file.originalname; //file.originalname is property of multer
  const fileType = req.file.mimetype; //file.mimetype is property of multer
  const fileSize = req.file.size; //file.size is property of multer

  res.json({"name": fileName, "type" : fileType, "size" : fileSize})
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
