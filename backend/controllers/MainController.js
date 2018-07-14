var database = require('../Models/db_model');
var request = require('request');
module.exports = {
    home:home,
    login:login,
    signup:signup,
    loginPost:loginPost,
    signupPost:signupPost

}


function home(req,res){
	res.render('index.ejs',{
    user:req.user
	});
}

function login(req,res){
    res.render('login/login.ejs',{
      message:""
  });
}
function signup(req,res){
    res.render('signup/signup.ejs',{
      message:""
  });
}

function loginPost(req,res){
  res.redirect('/upload')
}

function signupPost(req,res){
  res.redirect('/upload')
}

function parseIt(rawData){
    // rawData = JSON.stringify(rawData);
   /// console.log(rawData[82263]+" "+rawData[82264]+" "+rawData[82265])
    rawData = JSON.parse(rawData);
    return rawData;
}