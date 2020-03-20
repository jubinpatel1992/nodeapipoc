var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  console.log(req.body)
  const apiname = req.body.apiname;
  if(apiname) {
    res.status(200).send({message: "API called successfully", api: apiname });
  } else {
    res.status(401).send({message: 'Unauthorized'});
  }
});

module.exports = router;
