var database = require('../Models/db_model');
var request = require('request');
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/FNtNorjwZVgXJt4WzdBj'));
var User = require('../Models/user')
var con = require('../config/con')
var ethr = require('ethereumjs-tx')
var request=require('request')
var abi = con.abi;
module.exports = {
    home:home,
    login:login,
    signup:signup,
    loginPost:loginPost,
    signupPost:signupPost,
    profile:profile,
    createAccount:createAccount,
    doWeb3:doWeb3,
    getjson:getjson
}


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}

function profile(req,res){
  if(req.isAuthenticated){
    res.render('profile/index',{
      user:req.user
    })
  }else{
    res.redirect('/');
  }
}

function home(req,res){
  console.log(req.user);
	res.render('index.html',{
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

function createAddress(req,res){
  if(isAuthenticated){

  }else{
    res.redirect('/')
  }
}

function addAddress(req,res){
  if(isAuthenticated){
    User.findById(req.user.id).then( user => {
      if(user){
          user.updateAttributes({
          address:req.body.address
        })
        .success(function () {
          req.user = user
          res.redirect('/profile')
        })
      }
      else{
        res.redirect('/')
      }
    })
  }else{
    res.redirect('/')
  }
}

function doTransx(req,res){
  if(isAuthenticated){
    getjson()
    doWeb3(null)
  }else{
    res.redirect('/')
  }
}

// const_ = require('');
var values = {"fastest": 660, "fast": 600, "block_time": 15.683673469387756, "fastWait": 1.5, "speed": 0.9986545665983808, "safeLow": 560.0, "safeLowWait": 19.0, "fastestWait": 0.8, "average": 600.0, "blockNum": 5962093, "avgWait": 1.5, "nomine": 500.0}
function getjson(req,res){
    request.post(
    'https://ethgasstation.info/json/ethgasAPI.json',function (error, response, body) {
    if (error){
      throw error;
    }
    else{
      if(body.fastest){
        values = body
      }else{}
      console.log(body)
      // res.json(values);
    }
    });
}

function doWeb3(add){
  var userAdd = '';

  var add = '0x46076703Da25F14e3e1cAEabA6D46B9dACC4792B';
  var pvtkey = new Buffer('7c36f0817a2075558bc39cf6852028d39db695d5ce56346ef368d0f6e96b5771', 'hex');

  // var pvtkey = '7c36f0817a2075558bc39cf6852028d39db695d5ce56346ef368d0f6e96b5771';

  // var abi = '';
  // var bytecode = '';
  var contractABI = new web3.eth.Contract(abi);
  var contractAddress = '0x822eea21a587a6c673859322d4266a02876055b4';
 contractABI.options.address = contractAddress;

  // console.log(contractABI);

  var data = contractABI.methods.callHeavyFunction().encodeABI();

  console.log(data);
  web3.eth.getTransactionCount(add).then((nonce) => {
    // web3.eth.getGasPrice().then((gasPrice) =>{
    const gasPriceHex = web3.utils.toHex(1000000000);
    const gasLimitHex = web3.utils.toHex(600000);
    // console.log(gasPrice)
    var transaction = {
      gasPrice : gasPriceHex,
      gasLimit : gasLimitHex,
      data     : data,
      from     : add,
      nonce    : nonce,
      to       : contractAddress
    };

    var tx = new ethr(transaction);
    tx.sign(pvtkey);

    var stx = tx.serialize();
    web3.eth.sendSignedTransaction('0x' + stx.toString('hex'))
      .on('receipt',console.log);
  })
}

function createAccount(req,res){
  var details = web3.eth.accounts.create();
  if(req.isAuthenticated){
    User.findById(user.id)
    .on('success', user => {
      // Check if record exists in db
      if (user) {
          user.updateAttributes({
          address:details.address,
          secret: privatekey
        })
        .success(function () {
          req.user = user;
          res.redirect('/profile')
        })
      }
    })
  }else{
    res.redirect('/')
  }
}
// console.log(web3.fromWei(web3.eth.getBalance(add)));
// console.log(web3.eth.getTransactionCount(add));

function parseIt(rawData){
    // rawData = JSON.stringify(rawData);
   /// console.log(rawData[82263]+" "+rawData[82264]+" "+rawData[82265])
    rawData = JSON.parse(rawData);
    return rawData;
}