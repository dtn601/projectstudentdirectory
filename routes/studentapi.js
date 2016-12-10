
var express = require('express'),
	router = express.Router(),
	StudentModel = require('../models/studentinfo');

router.get('/',function(req, res){
	StudentModel.find({},'',function(err,post){
		if (err) console.error('Error getting', err);
		res.json(post);
	});
});

router.post('/',function(req, res){
	var studentInfo = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		slack: req.body.slack


	};

	var newStudent = new StudentModel(studentInfo);

	newStudent.save(function(err,success){
		res.redirect('/');
	});	
});

router.put('/',function(req, res){
	var id = req.body.id;
	var updateInfo = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		slack: req.body.slack
	};
	StudentModel.findByIdAndUpdate(id, updateInfo, function(err,post){
		if (err) console.error(err);
		res.send('SUCCESS!');
	});


});

router.delete('/',function(req, res){
	var id = req.body.id;

	StudentModel.findByIdAndRemove(id,function(err,post){
		if (err) console.error(err);
		res.send('SUCCESS!');
	});


});

module.exports = router;