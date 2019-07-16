var express = require('express');
var router = express.Router();
// var client = require('../ubi.js');

var mysql = require('mysql');
var con = mysql.createConnection({
     host: "localhost",
     user: "root",
     password: "zapbuild123",
     database: "mydb"
});

//route for home page
 router.get('/',function(req,res){
 	res.render('buttons'); 	
 });

//route for add venue
router.post('/add', function(req, res,next) {
  var hogg;
  res.render('add',{'data':hogg});
  next();
});

router.post('/add/submit', function(req, res) {
   
  console.log('You sent the venue name "' + req.body.venue_name+'".\n');
  console.log('You sent the variable Id "' + req.body.variableid+'".\n');

  res.write('You sent the venue name "' + req.body.venue_name+'".\n');
  res.write('You sent the variable Id "' + req.body.variableid+'".\n');

  var sql = "INSERT INTO zapvenue(`venue_name`,`variableid`) VALUES ('"+req.body.venue_name+"','"+req.body.variableid+"')";
  
  con.query(sql, function(err, result)  {
   // if(err) throw err;
   console.log("1 Record added")

res.render('buttons');
});

});

router.get('/show', function(req, res) {
	var venueList = [];


		
var sql="SELECT * FROM zapvenue";
	// Do the query to get data.
	con.query(sql, function(err, rows, fields) {
	  	if (err) {
	  		res.status(500).json({"status_code": 500,"status_message": "internal server error"});
	  	} else {
	  		// Loop check on each row
	  		for (var i = 0; i < rows.length; i++) {
	  			// Create an object to save current row's data
		  		var venue = {
		  			'id':rows[i].id,
		  			'venue_name':rows[i].venue_name,
		  			'variableid':rows[i].variableid
		  		}
		  		// Add object into array
		  		venueList.push(venue);
	  	}
	  	// console.log(venueList);
	  	// Render index.pug page using array 
	  	res.render('show', {"venueList": venueList});
	  	}
	});
	// Close the MySQL connection
	// con.end();

});



router.get('/venue/(:id)',function(req,res){

var venueList = [];
var hii=req.params.id;


var sql="SELECT * FROM zapvenue WHERE id=" + hii;
	// Do the query to get data.
	con.query(sql, function(err, rows, fields) {
	  	if (err) {
	  		res.status(500).json({"status_code": 500,"status_message": "internal server error"});
	  	} else {

	 
	  		// Loop check on each row
	  		for (var i = 0; i < rows.length; i++) {
	  			// Create an object to save current row's data
		  		var venue = {
		  			'id':rows[i].id,
		  			'venue_name':rows[i].venue_name,
		  			'variableid':rows[i].variableid
		  		}
		  		// Add object into array
		  		venueList.push(venue);
	  	}
	  }
	  	// console.log(venueList);
	  	
	  	res.render('edit', {"venueList": venueList});
	

});

});


router.post('/venue/(:id)',function(req,res){

	var variableId = req.body.variableid;
	var id=req.body.id;

	
	 res.write('You updated the variable Id "' + req.body.variableid+'".\n')


	var sql="UPDATE zapvenue SET variableid ='"  +variableId +"' WHERE id =" +id;
	console.log(sql);
	con.query(sql, function(err, result,fields)  {
    	if(err){
	    	console.log(err);
    	}
   		console.log("1 Record updated");
	res.render('buttons');
	}); 

});




router.get('/venues/(:id)',function(req,res){
	var venueList = [];
	var id=req.params.id;

	var sql="SELECT * FROM zapvenue WHERE id=" + id;

	con.query(sql, function(err, rows, fields) {
	  	if (err) {
	  		res.status(500).json({"status_code": 500,"status_message": "internal server error"});
	  	} else {
			// Loop check on each row
	  		for (var i = 0; i < rows.length; i++) {
	  			// Create an object to save current row's data
		  		var venues = {
		  			'id':rows[i].id,
		  			'venue_name':rows[i].venue_name,
		  			'variableid':rows[i].variableid
		  		}
		  		// Add object into array
		  		venueList.push(venues);
	  		}
	  	}
	  	
	  	res.render('delete', {"venueList": venueList});
	});
	// con.end();

});


 router.post('/venues/(:id)',function(req,res){
 	var id=req.body.id;
 	console.log(id);

 	  // console.log('You delete the id "' + req.body.id+'".\n');
 	   res.write('You delete the id "'+ req.body.id+'".\n');
	
 	var sql="DELETE FROM zapvenue WHERE id=" +id ;
 	console.log(sql);
 	con.query(sql,function(err,result,fields){
		 if (err) {
	 		console.log(err);
	 	}
   		console.log("1 Record deleted");
   		res.render('buttons');
 	});
	// con.end();
});
  	
  

// router.get('/',function (req, res, next) {
// 	res.render('action');
//   next()
// })

//Create router to get value in route
router.get('/show/livedata',function(req,res){
	var client=require('../ubi.js');
 	var hogg;

 	res.render('index',{'data':hogg})
});



module.exports = router ;
