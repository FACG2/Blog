var username = document.getElementById('name');
var pass = document.getElementById('password');
var subLog = document.querySelector('.form');
var msg = document.getElementById('message');
var validName = document.getElementById('validName');

function validUsername (username) {
  if (typeof username.value !== 'string' || username.value === '') {
    validName.innerHTML = '<span style="color:red">Please enter your username<br>Your name must be a string</span>';
    username.style = 'border-color:red';
    username.focus();
    return false;
  } else {
    return true;
  }
}

function ValidPass (pass) {
  if (typeof pass.value !== 'string' || pass.value === '') {
    msg.innerHTML = '<span style="color:red">Please enter your password<br>Your password must be a string</span>';
    pass.style = 'border-color:red';
    pass.focus();
    return false;
  } else {
    return true;
  }
}

subLog.addEventListener('submit', function (event) {
  event.preventDefault();
  validName.innerHTML = '';
  msg.innerHTML = '';
  username.style = 'border:none; border-bottom: 1px solid lightgrey;';
  pass.style = 'border:none; border-bottom: 1px solid lightgrey;';

  var vn = validUsername(username);
  var vp = ValidPass(pass);
  if (vn && vp) {
    // apiReq('/login', 'POST',  (response, err) => {
    //   if (err) {
    //     console.log(err);
    //   }
    //   console.log(response);
    // });
  }
});
