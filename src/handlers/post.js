const query = require('./../query');
const queryString = require('querystring');
const jwt = require('jsonwebtoken');
const SECRET = 'afdhasjkhdfsadjfhskdjhf';
const bcrypt = require('bcryptjs');

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
  req.on('end', () => {
    const data = queryString.parse(content);
    // const data = {
    //   name: 'test',
    //   password: '123',
    //   email: 'a@a.a'
    // };
    if (req.headers.cookie) {
      res.writeHead(302, {'location': '/'});
      res.end();
    }
    bcrypt.hash(data.password, 10, (err, hashedPassword) => {
      if (err) {
        res.end(err);
      } else {
        // console.log(hashedPassword, 'hashedPassword');
        data.password = hashedPassword;
        query(`INSERT INTO users(name , email , password) VALUES($1,$2,$3) RETURNING *`, [data.name, data.email, data.password], (err1, record) => {
          if (err1) {
            res.end('error is hereeeee');
          } else {
            // console.log(record);
            jwt.sign({name: record[0].name, id: record[0].id}, SECRET, (err2, token) => {
              if (err2) {
                console.log(err2);
                res.end();
              } else {
                res.writeHead(302, {'Set-Cookie': `token=${token}; Max-Age=99999`, 'Location': '/blogs'});
                res.end();
              }
            });
          }
        });
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
//
// function validateSignup (data, cb) {
//   /* validate username */
//   if (typeof data.username !== 'string' || data.username === '') {
//     // return cb('invalid username');
//   }
//   /* validate password */
//   if (typeof data.password !== 'string' || data.password === '') {
//     // return cb('invalid password');
//   }
//   /* validate confirm-password */
//   if (data.password !== data.confirmPassword) {
//     // return cb('password does not match!!!');
//   }
//   /* validate email */
//   // cb(true);
// }

module.exports = {
  handleSignup,
  handleAddBlog,
  handleEditBlog,
  handleDeleteBlog
};
