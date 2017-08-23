var username = document.getElementById('nameSign');
var email = document.getElementById('emailSign');
var pass = document.getElementById('passSign');
var conf = document.getElementById('confSign');
var msg = document.getElementById('message');
var strength = document.getElementById('strength');
var validName = document.getElementById('validName');
var validEmail = document.getElementById('validEmail');
var subSign = document.getElementById('subSign');

function validateUsername (str) {
  var illegalChars = /\W/; // allow letters, numbers, and underscores

  if (str.value === '') {
    validName.innerHTML = '<span style="color:red">Please enter your username</span>';
    str.style = 'border-color:red';
    str.focus();
    return false;
  } else if ((str.value.length < 5) || (str.length > 15)) {
    validName.innerHTML = '<span style="color:red">Username must have 5-15 characters</span>';
    str.style = 'border-color:red';
    str.focus();
    return false;
  } else if (illegalChars.test(str.value)) {
    validName.innerHTML = '<span style="color:red">Please enter valid Username. Use only numbers and alphabets</span>';
    str.style = 'border-color:red';
    str.focus();
    return false;
  } else {
    validName.innerHTML = '';
    return true;
  }
}

function ValidatePass (pass, conf) {
  pass.value.trim();
  conf.value.trim();
  if (pass.value.length === 0 && conf.value.length !== 0) {
    if ((conf.value.length < 6) || (conf.value.length > 15)) {
      msg.innerHTML = '<span style="color:red">Please enter your password<br>Your confirm password must have length 6-15</span>';
      pass.style = 'border-color:red';
      pass.focus();
      return false;
    } else {
      msg.innerHTML = '<span style="color:red">Please enter your password</span>';
      pass.style = 'border-color:red';
      pass.focus();
      return false;
    }
  } else if (conf.value.length === 0 && pass.value.length !== 0) {
    if ((pass.value.length < 6) || (pass.value.length > 15)) {
      msg.innerHTML = '<span style="color:red">Please confirm your password<br>Your password must have length 6-15</span>';
      pass.style = 'border-color:red';
      conf.focus();
      return false;
    } else {
      msg.innerHTML = '<span style="color:red">Please confirm your password</span>';
      conf.style = 'border-color:red';
      conf.focus();
      return false;
    }
  } else if (pass.value.length === 0 && conf.value.length === 0) {
    msg.innerHTML = '<span style="color:red">Enter your password and confirm password</span>';
    pass.style = 'border-color:red';
    conf.style = 'border-color:red';
    pass.focus();
    return false;
  } else if (pass.value.length !== 0 && conf.value.length !== 0 && pass.value !== conf.value) {
    msg.innerHTML = '<span style="color:red">Your password and confirm password should be the same !</span>';
    pass.style = 'border-color:red';
    conf.style = 'border-color:red';
    pass.focus();
    conf.focus();
    return false;
  } else if (pass.value.length !== 0 && pass.value === conf.value) {
    if ((pass.value.length < 6) || (pass.value.length > 15)) {
      msg.innerHTML = '<span style="color:red">Your password must have length 6-15</span>';
      pass.style = 'border-color:red';
      pass.focus();
      return false;
    }
  } else {
    return true;
  }
}

function ValidateEmail (myEmail) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.value.match(mailformat)) {
    return true;
  } else {
    return false;
  }
}

function validEmailFun (email) {
  var result = ValidateEmail(email);
  if (email.value.length === 0) {
    validEmail.innerHTML = '<span style="color:red">Please enter your email</span>';
    email.style = 'border-color:red';
    email.focus();
    return false;
  } else if (!result) {
    validEmail.innerHTML = '<span style="color:red">Please enter valid email</span>';
    email.style = 'border-color:red';
    email.focus();
    return false;
  } else {
    return true;
  }
}

function passwordChanged () {
  var strongRegex = new RegExp('^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$', 'g');
  var mediumRegex = new RegExp('^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$', 'g');
  var enoughRegex = new RegExp('(?=.{6,}).*', 'g');
  if (pass.value.length === 0) {
    strength.innerHTML = 'Type Password';
  } else if (enoughRegex.test(pass.value) === false) {
    strength.innerHTML = 'More Characters';
  } else if (strongRegex.test(pass.value)) {
    strength.innerHTML = '<span style="color:green">Strong!</span>';
  } else if (mediumRegex.test(pass.value)) {
    strength.innerHTML = '<span style="color:orange">Medium!</span>';
  } else {
    strength.innerHTML = '<span style="color:red">Weak!</span>';
  }
}

pass.addEventListener('keyup', passwordChanged);

subSign.addEventListener('click', function (event) {
  validName.innerHTML = '';
  validEmail.innerHTML = '';
  msg.innerHTML = '';
  username.style = 'border:none; border-bottom: 1px solid lightgrey;';
  email.style = 'border:none; border-bottom: 1px solid lightgrey;';
  pass.style = 'border:none; border-bottom: 1px solid lightgrey;';
  conf.style = 'border:none; border-bottom: 1px solid lightgrey;';

  // if (validateUsername(username) && validEmailFun(email) && ValidatePass(pass, conf)) {
  //   subSign.disabled = false;
  // }
});
