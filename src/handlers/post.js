const query = require('./../query');
const queryString = require('querystring');
const jwt = require('jsonwebtoken');
const SECRET = 'afdhasjkhdfsadjfhskdjhf';
const bcrypt = require('bcryptjs');
const cookie = require('cookie');

function handleSignup (req, res) {
  let content = '';
  req.on('data', (chunk) => {
    content += chunk;
  });
  req.on('end', () => {
    const data = queryString.parse(content);
    if (req.headers.cookie) {
      res.writeHead(302, {'location': '/'});
      res.end();
    }
    bcrypt.hash(data.password, 10, (err, hashedPassword) => {
      if (err) {
        console.log(err);
        res.end();
      } else {
        console.log(isValid(data));
        if (!isValid(data)) {
          data.password = hashedPassword;
          query(`INSERT INTO users(name , email , password) VALUES($1,$2,$3) RETURNING *`, [data.name, data.email, data.password], (err1, record) => {
            if (err1) {
              res.writeHead(302, {'Location': '/signup'});
              res.end();
            } else {
              jwt.sign({name: record[0].name, id: record[0].id}, SECRET, (err2, token) => {
                if (err2) {
                  res.writeHead(302, {'Location': '/'});
                  res.end();
                } else {
                  res.writeHead(302, {'Set-Cookie': `token=${token}; Max-Age=99999`, 'Location': '/blogs'});
                  res.end();
                }
              });
            }
          });
        } else {
          // if data is not valid
          res.writeHead(302, {'Location': '/signup'});
          res.end();
        }
      }
    });
  });
}

function isValid (data) {
  return (typeof data.name !== 'string' || data.name !== '') &&
          (typeof data.email !== 'string' || !data.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))  && //eslint-disable-line
          (typeof data.password !== 'string') && (data.confirmPassword !== data.password);
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
              res.writeHead(302, {'Location': '/404'});
              res.end();
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
 // Not Implemented Yet
}

function handleDeleteBlog (req, res) {
 // Not Implemented Yet
}

module.exports = {
  handleSignup,
  handleAddBlog,
  handleEditBlog,
  handleDeleteBlog
};
