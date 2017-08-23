const getHandlers = require('./handlers/get');
const postHandlers = require('./handlers/post');

function router (req, res) {
  const url = req.url;
  if (url === '/') {
    /* checks if there is a cookie */
    getHandlers.handleHome(req, res);
  } else if (url === '/login') {
    getHandlers.handleLogin(req, res);
  } else if (url === '/signup') {
    getHandlers.handleSignup(req, res);
  } else if (url === '/sign-up') {
    postHandlers.handleSignup(req, res);
  } else if (url === '/blogs') {
    /*

    */
    getHandlers.handleBlogs(req, res);
  } else if (url === '/user-blog') {
    getHandlers.handleUserBlog(req, res);
  } else if (url === '/blogs/add') {
    postHandlers.handleAddBlog(req, res);
  } else if (url === '/NewBlog') {
    getHandlers.handleNewBlog(req, res);
  } else if (url === '/logout') {
    getHandlers.handleLogout(req, res);
  } else if (url === '/blogs/edit') {
    postHandlers.handleEditBlog(req, res);
  } else if (url === '/blogs/delete') {
    postHandlers.handleDeleteBlog(req, res);
  } else {
    getHandlers.handleGeneric(req, res);
  }
}

module.exports = router;
