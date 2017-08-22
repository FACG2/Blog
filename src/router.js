// const getHandlers = require('./handlers/get');
// const postHandlers = require('./handlers/post');

function router (req, res) {
  const url = req.url;
  if (url === '/') {

  } else if (url === '/login') {

  } else if (url === '/sign-up') {

  } else if (url === '/blogs') {

  } else if (url === '/user-blog') {

  } else if (url === '/blogs/add') {

  } else if (url === '/logout') {

  } else if (url === '/blogs/edit') {

  } else if (url === '/blogs/delete') {

  }
  res.end();
}

module.exports = router;
