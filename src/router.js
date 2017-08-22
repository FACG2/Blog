const getHandlers = require('./handlers/get');
const postHandlers = require('./handlers/post');

function router (req, res) {
  const url = req.url;
  if (url === '/') {
    /* checks if there is a cookie */
    getHandlers.handleHome(req, res);
  } else if (url === '/login') {
    /*
      make sure that user exists in DB
      creates a cookie for user name
      input: user_id
      redirect to home.html
    */
    getHandlers.handleLogin(req, res);
  } else if (url === '/sign-up') {
    /*
      insert data to DB
      create a new cookie
      redirect to home.html
      input: username , password , email
    */
    postHandlers.handleSignup(req, res);
  } else if (url === '/blogs') {
    /*

    */
    getHandlers.handleBlogs(req, res);
  } else if (url === '/user-blog') {
    getHandlers.handleUserBlog(req, res);
  } else if (url === '/blogs/add') {
    postHandlers.handleAddBlog(req, res);
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
