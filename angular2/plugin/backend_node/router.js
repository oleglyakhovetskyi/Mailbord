let express = require('express');
let router = express.Router();
let path = require('path');

router.use(function(req, res, next) {
    console.log('request to', req.path);
    next();
});

router.get('*', function(req, res) {
    res.status(200).sendFile(path.resolve('build/index.html'));
});

module.exports = router;
