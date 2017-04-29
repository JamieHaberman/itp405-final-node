require('dotenv').config();

var express = require('express');
var app = express();
var Photo = require('./photo');
var Area = require('./area');
var User = require('./user');

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



//get all photos
app.get('/api/photos', function(request, response) {
	Photo.fetchAll({require: true, withRelated: ['area']}).then(function(photos) {
		response.json({
			photos: photos
		});
	});
});

//get photos by id
app.get('/api/photos/:id', function(request, response) {
	Photo
	.where('id', request.params.id)
	.fetch({require: true, withRelated: ['area']})
	.then(function(photos) {
		response.json({
			photos: photos
		});
	}, function() {
		response.json({
			error: "User cannot be found"
		});
	});
});


//get users by id
app.get('/api/users/:id', function(request, response) {
	User
	.where('id', request.params.id)
	.fetch({require: true})
	.then(function(users) {
		response.json({
			users: users
		});
	}, function() {
		response.json({
			error: "User cannot be found"
		});
	});
});

//add users
app.post('/api/users', function(request, response) {
var user = new User({
id: request.body.id,
email: request.body.email,
password: request.body.password
});

user.save().then(function() {
response.json(user);
});
});

//delete users
app.delete('/api/users/:id', function(request, response) {
  var user = new User({
    id: request.params.id
  });

  user
    .destroy({ require: true })
    .then(function(user) {
      response.json(user);
    }, function() {
      response.status(404).json({
        error: 'user not found'
      });
    });
});

app.listen(process.env.PORT || 3000);
