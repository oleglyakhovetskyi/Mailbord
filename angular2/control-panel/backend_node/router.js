let express = require('express');
let router = express.Router();
let path = require('path');

router.use(function(req, res, next) {
    // console.log('Hello world');
    next();
});

router.get('*', function(req, res) {
	// var pathArray = req.path.split('/');
	var obj = path.parse(req.path);
	console.log(obj);
	// console.log(typeof obj.base);
	// console.log(obj.base);

	if (obj.base == 'plugin') {
		res.status(200).sendFile(path.resolve('build/plugin.html'));
		console.log('sent plugin.html');
	}
	else {
		// console.log('index');
    	res.status(200).sendFile(path.resolve('build/index.html'));
	}

});

module.exports = router;
