var express = require('express');
var path = require('path')
var router = express.Router();

const Fs = require('fs');
const CsvReadableStream = require('csv-reader');
 
let inputStream = Fs.createReadStream(path.join(__dirname, '../public', 'data.csv'), 'utf8');

/* GET users listing. */
router.get('/', function(req, res, next) {
  const currentdate = new Date();
  inputStream
    .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
    .on('data', function (row) {
      const csvdate = new Date(row[1]); 
      console.log()
        // if(csvdate !== 'Invalid Date' && )
    })
    .on('end', function (data) {
        console.log('No more rows!');
    });
});

module.exports = router;
