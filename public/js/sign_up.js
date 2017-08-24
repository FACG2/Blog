// var name = document.querySelector('.username');
var email = document.querySelector('.email');
var password = document.querySelector('.password');
var confirmPassword = document.querySelector('.confirm-password');
// var form = document.querySelector('.form');
var message = document.querySelector('.message');

var obj = {
  name: true,
  email: false,
  password: true,
  confirmPassword: false
};

email.addEventListener('focusout', function () {
  if (email.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {//eslint-disable-line
    obj.email = true;
    email.style.border = '1px solid #0F0';
    message.innerHTML = '';
  } else {
    message.innerHTML = "<p style='color:red'>Please Enter a valid email address</p>";
    email.style.border = '1px solid #F00';
    obj.email = false;
  }
  if (obj.emai && obj.confirmPassword) message.innerHTML = '';
});

confirmPassword.addEventListener('focusout', function () {
  if (password.value === confirmPassword.value) {
    obj.confirmPassword = true;
    password.style.border = '1px solid #0F0';
    confirmPassword.style.border = '1px solid #0F0';
    // message.innerHTML = '';
  } else {
    message.innerHTML = "<p style='color:red'>Password Doesn't match</p>";
    password.style.border = '1px solid #F00';
    confirmPassword.style.border = '1px solid #F00';
    obj.confirmPassword = false;
  }
  if (obj.name && obj.confirmPassword) message.innerHTML = '';
});

// form.addEventListener('submit', function (event) {
//   event.preventDefault();
//   request('/sign-up', 'POST' , data , function (err, res) {//eslint-disable-line
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(res);
//     }
//   });
// });
