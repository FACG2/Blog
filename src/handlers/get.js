const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const SECRET = 'afdhasjkhdfsadjfhskdjhf';
const query = require('./../query');
// const cookie = require('cookie');
const bcrypt = require('bcryptjs');

const contentTypes = {
  css: 'text/css',
  js: 'application/javascript',
  ico: 'image/x-icon'
};

function handleHome (req, res) {
  if (req.headers.cookie) {
    res.writeHead(302, {'Location': '/blogs'});
    return res.end();
  }

  fs.readFile(path.join(__dirname, '/../../public/index.html'), (err, data) => {
    if (err) {
      res.writeHead(500, {'Content-Type': 'text/html'});
      res.end('Internal Server Error');
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    }
  });
}

function handleLogin (req, res) {
  // if (!req.headers.cookie) {
  //   console.log('hereee');
  //   res.writeHead(302, {'Location': '/blogs'});
  //   res.end();
  //   return;
  // }
  const data = {
    name: 'test',
    password: '123'
  };
  bcrypt.hash(data.password, 10, (err, hashedPassword) => {
    if (err) {
      // console.log(err);
      res.writeHead(302, {'Location': '/'});
      res.end();
    } else {
      query(`SELECT * FROM users WHERE name=$1`, [data.name], (err1, record) => {
        if (err1) {
          // console.log(err1);
          res.writeHead(302, {'Location': '/'});
          res.end();
        } else {
          // console.log(record);
          if (record[0]) {
            bcrypt.compare(data.password, record[0].password, (err3, result) => {
              if (err3) {
                // console.log(err3);
                // res.end('error 3');
                res.writeHead(302, {'Location': '/'});
                res.end();
              } else {
                if (result) {
                  jwt.sign({name: record[0].name, id: record[0].id}, SECRET, (err2, token) => {
                    if (err2) {
                      // console.log(err2);
                      res.writeHead(302, {'Location': '/'});
                      res.end();
                    } else {
                      res.writeHead(302, {'Set-Cookie': `token=${token}; Max_Age=999999`, 'Location': '/blogs'});
                      res.end();
                    }
                  });
                } else {
                  res.writeHead(302, {'Location': '/'});
                  res.end();
                }
              }
            });
          } else {
            // console.log('cannot login because your password does not exist');
            res.writeHead(302, {'Location': '/'});
            res.end();
          }
        }
      });
    }
  });
}

function handleBlogs (req, res) {
  // if (!req.headers.cookie) {
  //   res.writeHead(302, {'Location': '/'});
  //   res.end();
  // } else res.end('Welcome to our blog ^_^');

  fs.readFile(path.join(__dirname, '/../../public/home.html'), (err, data) => {
    if (err) {
      res.writeHead(500, {'Content-Type': 'text/html'});
      res.end('Server Error');
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    }
  });
}

function handleUserBlog (req, res) {

}

function handleLogout (req, res) {
  res.writeHead(302, {'Set-Cookie': `token=0; Max-Age=0`, 'Location': '/'});
  res.end();
}

function handleGeneric (req, res) {
  const parts = req.url.split('.');
  const fileExtension = parts[parts.length - 1];
  fs.readFile(path.join(__dirname, '/../../public', req.url), (err, data) => {
    if (err) {
      res.writeHead(500, {'Content-Type': 'text/html'});
      res.end('Internal Server Error');
    } else {
      res.writeHead(200, {'Content-Type': contentTypes[fileExtension]});
      res.end(data);
    }
  });
}

module.exports = {
  handleHome,
  handleLogin,
  handleBlogs,
  handleUserBlog,
  handleLogout,
  handleGeneric
};
