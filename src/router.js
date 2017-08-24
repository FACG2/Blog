const getHandlers = require('./handlers/get');
const postHandlers = require('./handlers/post');

function router (req, res) {
  const url = req.url;
  if (url === '/' && req.method === 'GET') {
    /* checks if there is a cookie */
    getHandlers.handleHome(req, res);
  } else if (url === '/login' && req.method === 'POST') {
    getHandlers.handleLogin(req, res);
  } else if (url === '/signup' && req.method === 'GET') {
    getHandlers.handleSignup(req, res);
  } else if (url === '/sign-up' && req.method === 'POST') {
    postHandlers.handleSignup(req, res);
  } else if (url === '/blogs' && req.method === 'GET') {
    getHandlers.handleBlogs(req, res);
  } else if (url === '/getdata' && req.method === 'GET') {
    getHandlers.handleGetData(req, res);
  } else if (url === '/user-blog' && req.method === 'GET') {
    getHandlers.handleUserBlog(req, res);
  } else if (url === '/blogs/add' && req.method === 'POST') {
    postHandlers.handleAddBlog(req, res);
  } else if (url === '/NewBlog' && req.method === 'GET') {
    getHandlers.handleNewBlog(req, res);
  } else if (url === '/logout' && req.method === 'GET') {
    getHandlers.handleLogout(req, res);
  } else if (url === '/blogs/edit' && req.method === 'POST') {
    postHandlers.handleEditBlog(req, res);
  } else if (url === '/blogs/delete' && req.method === 'POST') {
    postHandlers.handleDeleteBlog(req, res);
  } else if (url === '/404' && req.method === 'GET') {
    getHandlers.handleNotFound(req, res);
  } else {
    getHandlers.handleGeneric(req, res);
  }
}

module.exports = router;
