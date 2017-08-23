const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const SECRET = 'afdhasjkhdfsadjfhskdjhf';
const query = require('./../query');
const cookie = require('cookie');
const bcrypt = require('bcryptjs');
const queryString = require('querystring');

const contentTypes = {
  css: 'text/css',
  js: 'application/javascript',
  ico: 'image/x-icon'
};

function handleHome (req, res) {
  if (req.headers.cookie) {
    const token = cookie.parse(req.headers.cookie).token;
    jwt.verify(token, SECRET, (err, result) => {
      if (err) {
        readHome(req, res);
      } else {
        res.writeHead(302, {'Location': '/blogs'});
        res.end();
      }
    });
  } else {
    readHome(req, res);
  }
}

function readHome (req, res) {
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
  // const data = {
  //   name: 'test',
  //   password: '123'
  // };
  let content = '';
  req.on('data', (chunk) => {
    content += chunk;
  });

  req.on('end', () => {
    const data = queryString.parse(content);
    bcrypt.hash(data.password, 10, (err, hashedPassword) => {
      if (err) {
        res.writeHead(302, {'Location': '/'});
        res.end();
      } else {
        query(`SELECT * FROM users WHERE name=$1`, [data.name], (err1, record) => {
          if (err1) {
            res.writeHead(302, {'Location': '/'});
            res.end();
          } else {
            if (record[0]) {
              bcrypt.compare(data.password, record[0].password, (err3, result) => {
                if (err3) {
                  res.writeHead(302, {'Location': '/'});
                  res.end();
                } else {
                  if (result) {
                    jwt.sign({name: record[0].name, id: record[0].id}, SECRET, (err2, token) => {
                      if (err2) {
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
              res.writeHead(302, {'Location': '/'});
              res.end();
            }
          }
        });
      }
    });
  });
}

function handleBlogs (req, res) {
  if (req.headers.cookie) {
    const token = cookie.parse(req.headers.cookie).token;
    jwt.verify(token, SECRET, (err, result) => {
      if (err) {
        res.writeHead(302, {'Location': '/'});
        res.end();
      } else {
        readBlogs(req, res);
      }
    });
  } else {
    res.writeHead(302, {'Location': '/'});
    res.end();
  }
}

function readBlogs (req, res) {
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

function handleSignup (req, res) {
  fs.readFile(path.join(__dirname, '/../../public/sign_up.html'), (err, data) => {
    if (err) {
      res.writeHead(302, {'Location': '/'});
      res.end();
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    }
  });
}

function handleNewBlog (req, res) {
  if (req.headers.cookie) {
    const token = cookie.parse(req.headers.cookie).token;
    jwt.verify(token, SECRET, (err, result) => {
      if (err) {
        res.writeHead(302, {'Location': '/'});
        res.end();
      } else {
        readAddBlog(req, res);
      }
    });
  } else {
    res.writeHead(302, {'Location': '/'});
    res.end();
  }
}

function readAddBlog (req, res) {
  fs.readFile(path.join(__dirname, '/../../public/add_blog.html'), (err, data) => {
    if (err) {
      res.writeHead(302, {'Location': '/'});
      res.end();
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    }
  });
}

function handleGetData (req, res) {
  if (req.headers.cookie) {
    const token = cookie.parse(req.headers.cookie).token;
    jwt.verify(token, SECRET, (err, result) => {
      if (err) {
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'error'}));
      } else {
        query('SELECT posts.id , posts.title , posts.contents , posts.post_date , users.id , users.name FROM posts INNER JOIN users ON users.id = posts.user_id;', [], (err1, records) => {
          if (err) {
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'error'}));
          } else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            console.log(result);
            res.end(JSON.stringify({username: result.name, records: records}));
          }
        });
      }
    });
  } else {
    res.writeHead(302, {'Location': '/'});
    res.end();
  }
}

function handleNotFound (req, res) {
  fs.readFile(path.join(__dirname, '/../../public/404.html'), (err, data) => {
    if (err) {
      res.writeHead(302, {'Location': '/'});
      res.end();
    } else {
      res.writeHead(200, {'Content-Type': 'text/html'});
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
  handleGeneric,
  handleSignup,
  handleGetData,
  handleNewBlog,
  handleNotFound
};
