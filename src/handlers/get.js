const fs = require('fs');
const path = require('path');

const contentTypes = {
  css: 'text/css',
  js: 'application/javascript',
  ico: 'image/x-icon'
};

function handleHome (req, res) {
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

}

function handleBlogs (req, res) {

}

function handleUserBlog (req, res) {

}

function handleLogout (req, res) {

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
