const query = require('./../query');
const queryString = require('querystring');

function handleSignup (req, res) {
  /*
    insert data to DB
    create a new cookie
    redirect to home.html
    input: username , password , email
  */
  let content = '';
  req.on('data', (chunk) => {
    content += chunk;
  });
  // req.headers.cookies
  req.on('end', () => {
    const data = queryString.parse(content);
    validateSignup(data, (res) => {
      if (res) {
        query('INSERT INTO users(name , email , password) VALUES($1,$2,$3) RETURNING *', [data.name, data.email, data.password], (err, res) => {
          if (err) {
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'sign up failed'}));
          } else {
            /* CREATE A NEW COOKIE WITH USER _ID */
            /* REDIRECT TO /blogs Page  (home.html) */
          }
        });
      } else {
        // handle if two passwords are not equal
      }
    });
  });
}

function handleAddBlog (req, res) {

}

function handleEditBlog (req, res) {

}

function handleDeleteBlog (req, res) {

}

function validateSignup (data, cb) {
  /* validate username */
  // if (typeof data.username !== 'string' || data.username === '') {
  //   return cb('invalid username');
  // }
  // /* validate password */
  // if (typeof data.password !== 'string' || data.password === '') {
  //   return cb('invalid password');
  // }
  // /* validate confirm-password */
  // if (data.password !== data.confirmPassword) {
  //   return cb('password does not match!!!');
  // }
  /* validate email */
}

module.exports = {
  handleSignup,
  handleAddBlog,
  handleEditBlog,
  handleDeleteBlog
};
