const url = "http://localhost:8080/";

(function(){
  
    // retrieve needed boxes and elements
    var $_waitbutton3     = $('#waitbutton3')
    var $_waitbutton2     = $('#waitbutton2')
    var $_waitbutton1     = $('#waitbutton1')
    var $_hashButton      = $('#hashSubmit');
    var $_hashtextinput   = $('#hashtextinput:text');
    var $_wrapper         = $('boxes-wrapper');
    var $_loginBox        = $('.login-box');
    var $_loadingBox      = $('.loading-box');
    var $_userProfile     = $('.userProfile')
    var $_loadingBoxText  = $('.inner-cell');
    var $_errorBox        = $('.error-box');
    var $_inputSubmit     = $('.loginBtn');

    $_hashButton.click(() => {
      console.log($_hashtextinput.val())
      _post('address', {
        address: $_hashtextinput.val()
      });
    })

    _get("").then((data) => console.log(data))
    
    
    function startLogin()
    {
        $_loginBox.addClass("loading")
      
      // hide login box
      
      // waite for hidden login box and show loading view
    //   setTimeout(function(){
    //     addClass(loadingBox, 'in-mid');
        
    //     // waiting until request finished or finish
        
    //   }, 300);
      
      request();
    }
    
    function request() {
        $_loadingBox.addClass("in-mid");
        _post('', {facebook: "32u59843982855"}).then((data) => {
            console.log(data);
        }).catch((err) => {
            console.log(err);
            $_loadingBox.removeClass("in-mid")
            $_errorBox.addClass("in-mid")
        })
    //   var result = (email == 'max@example.com' && password == '12345678');
    //   setTimeout(function(){
    //     finished(null, result);
    //   }, 2000);
    }
    function myfunk(val){
      var obj = {
        "val": val
      }
      $.post('/doTransx',obj).done()
    }
   
    
    
    // initialize onclick event
    // $_inputSubmit.click(function(e){
    //   e.preventDefault();
    //   startLogin();
    //   return false;
    // });
    
    // buttonPassword.addEventListener('click', function(e){
    //   addClass(loginBox, 'password-reset');
    //   inputSubmit.value = 'Reset Password';
    //   isRequestPassword = true;
    // });
    
    // buttonLogin.addEventListener('click', function(e){
    //   removeClass(loginBox, 'password-reset');
    //   inputSubmit.value = 'Login';
    //   isRequestPassword = false;
    // });
    









  function fetchConfig(method, load) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //some new text added want to add more, need more testing
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', url);
  
    const config = {
      method: method,
      credentials: 'include',
      headers: headers
    };
    if (method === 'post') {
      const payload = JSON.stringify(load);
      config.body = payload;
    }
  
    return Object.assign({}, config);
  };






  function _get(path) {
    console.log(fetchConfig)
    const promise = new Promise((resolve, reject) => {
      const serverPath = url + path;
      const fetchConfigs = fetchConfig('get');
      fetch(serverPath, fetchConfigs).then((response) => {
        return response.json();
      }).then((data) => {
        return resolve(data);
      }).catch((err) => {
        return reject(err);
      });
    });
    return promise;
  }

  function _post(path, payload) {
    console.log(path, payload)
    const promise = new Promise((resolve, reject) => {
      const serverPath = url + path;
      const fetchConfigs = fetchConfig('post', payload);
      fetch(serverPath, fetchConfigs).then((response) => {
        return response.json();
      }).then((data) => {
        return resolve(data);
      }).catch((err) => {
        return reject(err);
      });
    });
    return promise;
  }
  })();