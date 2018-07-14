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
    getjson:getjson,
    addAddress:addAddress,
    doTransx:doTransx
}


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}

function profile(req,res){
  if(req.isAuthenticated){
    console.log(req.user)
    res.render('index',{
      user:req.user,
      data:values
    })
  }else{
    res.redirect('/');
  }
}

function home(req,res){
  console.log(req.user);
	res.render('index',{
    user:req.user,
    data:values
	});
}



function createAddress(req,res){
  if(isAuthenticated){

  }else{
    res.redirect('/')
  }
}

function addAddress(req,res){
  if(req.isAuthenticated){
    User.findById(req.user.id).then( user => {
      if(user){
          user.updateAttributes({
          address:req.body.address
        })
        .then(function () {
          req.session.passport.user = user
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
  if(req.isAuthenticated){
    getjson()
    doWeb3(req.user.address,res,req.body.val)
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
      if(res)
      res.json(values);
    }
    });
}

function doWeb3(address,res,val){
  var userAdd = '';

  var add = '0x46076703Da25F14e3e1cAEabA6D46B9dACC4792B';
  var pvtkey = new Buffer('7c36f0817a2075558bc39cf6852028d39db695d5ce56346ef368d0f6e96b5771', 'hex');

  // var pvtkey = '7c36f0817a2075558bc39cf6852028d39db695d5ce56346ef368d0f6e96b5771';

  // var abi = '';
  // var bytecode = '';
  var contractABI = new web3.eth.Contract(abi);
  var contractAddress = '0x47faf76142e27594f039b29a7d459f83531a1351';
 contractABI.options.address = contractAddress;

  // console.log(contractABI);

  var data = contractABI.methods.callHeavyFunction2(address).encodeABI();

  console.log(data);
  web3.eth.getTransactionCount(add).then((nonce) => {
    // web3.eth.getGasPrice().then((gasPrice) =>{
    const gasPriceHex = web3.utils.toHex(10000000000);
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
      .then((tx) =>{
        console.log(tx.transactionHash)
	redirect(res,tx)
//        res.redirect('https://ropsten.etherscan.io/tx/'+tx.transactionHash)
//	res.redirect('/')
      })
      // .then((tx)=> {
      //   res.redirect('https://ropsten.etherscan.io/tx')
      // });
  })
}

function redirect(res,tx){
	console.log("lets redirect")
	 res.send(tx.transactionHash)
}

function createAccount(req,res){
  var details = web3.eth.accounts.create();
  if(req.isAuthenticated){
    User.findById(req.user.id)
    .then(user => {
      // Check if record exists in db
      if (user) {
          user.updateAttributes({
          address:details.address,
          secret: details.privateKey
        })
        .then(() => {
          
          // console.log(req.session)
          User.findById(user.id).then(use =>{
            req.session.passport.user = use
            res.redirect('/profile')
          })
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
