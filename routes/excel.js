var express = require('express');
var multer = require('multer');
var pd = require("node-pandas")
var path = require('path')
var router = express.Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
},
filename: function (req, file, cb) {
  cb(null, Date.now() + '-' +file.originalname )
}
});

var upload = multer({ storage: storage }).single('file');

router.post('/', function(req, res, next) {
  let df = '';
  upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
          return res.status(500).json(err)
      } else if (err) {
          return res.status(500).json(err)
      }
      df = pd.readCsv(path.join(__dirname, '../public', req.file.filename))
      const days = req.body.days;

      var dates = [], result = [];
      for(let i=0; i<df.length; i++) {
        if(df[i].date && new Date(df[i].date) != "Invalid Date") dates.push(new Date(df[i].date));
      }
      var mostRecentDate =  new Date(Math.max.apply(null, dates));
      mostRecentDate.setDate(mostRecentDate.getDate() + days);
      for(let i=0; i<df.length; i++) {
        if(df[i].date && new Date(df[i].date) != "Invalid Date" && mostRecentDate > new Date(df[i].date)) result.push(df[i]);
      }
      
      res.send(result);
  })
});

module.exports = router;
