const query = require('./../query');
const queryString = require('querystring');
const jwt = require('jsonwebtoken');
const SECRET = 'afdhasjkhdfsadjfhskdjhf';
const bcrypt = require('bcryptjs');
// const path = require('path');
// const fs = require('fs');
const cookie = require('cookie');

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
  let content = '';
  req.on('data', (chunk) => {
    content += chunk;
  });
  req.on('end', () => {
    const data = queryString.parse(content);
    if (req.headers.cookie) {
      const token = cookie.parse(req.headers.cookie).token;
      jwt.verify(token, SECRET, (err, result) => {
        if (err) {
          res.writeHead(302, {'Location': '/'});
          res.end();
        } else {
          query('INSERT INTO posts(title,contents,post_date,user_id) VALUES ($1,$2,$3,$4) RETURNING * ', [data.title, data.contents, data.post_date, result.id], (error, res1) => {
            if (error) {
              console.log(error);
              res.end('There is error');
            } else {
              res.writeHead(302, {'Location': '/blogs'});
              res.end();
            }
          });
        }
      });
    } else {
      res.writeHead(302, {'Location': '/'});
      res.end();
    }
  });
}

function handleEditBlog (req, res) {

}

function handleDeleteBlog (req, res) {

}

module.exports = {
  handleSignup,
  handleAddBlog,
  handleEditBlog,
  handleDeleteBlog
};
