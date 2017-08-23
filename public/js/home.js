(function () {
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
  return blogs.reduce(function (res, blog) {
    return res +
      '<div class="card_viwe">' +
      '<div id="card">' +
      '<h2 id="title">' + blog.title + '</h2>' +
      '<p id="post_content">' +
      blog.contents +
      '</p>' +
      '</div>' +
      '</div>';
  }, '');
}
