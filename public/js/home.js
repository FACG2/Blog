(function () {
  // eslint-disable-next-line no-use-before-define
  request('/getdata', 'GET', function (err, res) {//eslint-disable-line
    if (err) {
      console.log(err);
    } else {
      document.querySelector('#username').textContent = res.username;
      document.querySelector('.content').innerHTML = dom(res.records);
    }
  });
})();

function dom (blogs) {
  console.log(blogs);
  return blogs.reduce(function (res, blog) {
    return res +
      '<div class="card_viwe">' +
      '<div id="card">' +
      '<h2 id="title">' + blog.title + '</h2>' +
      '<p id="post_content">' +
      blog.contents +
      '</p>' +
      '<h6>' + blog.name + '</h6>' +
      '</div>' +
      '</div>';
  }, '');
}
