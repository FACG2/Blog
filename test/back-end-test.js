const test = require('tape');
const shot = require('shot');
const router = require('../src/router.js');
const connection = require('../database/db_connection.js');

test('Home route test', (t) => {
  shot.inject(router, {method: 'get', url: '/'}, (res) => {
    t.equal(res.statusCode, 200, 'respond with 200');
    t.end();
  });
});

test('Not Found test', (t) => {
  shot.inject(router, {method: 'get', url: '/kjadgkj'}, (res) => {
    t.equal(res.statusCode, 302, 'respond with 404.html');
    t.end();
  });
});

test('Public route test', (t) => {
  shot.inject(router, {method: 'get', url: '/public/index.html'}, (res) => {
    t.equal(res.statusCode, 302, 'public respond with 302');
    t.end();
  });
});

test('Public style route test', (t) => {
  shot.inject(router, {method: 'get', url: '/public/css/home.css'}, (res) => {
    t.equal(res.statusCode, 302, 'public respond with 302');
    t.end();
  });
});

test('Public js route test', (t) => {
  shot.inject(router, {method: 'get', url: '/public/js/index.js'}, (res) => {
    t.equal(res.statusCode, 302, 'public respond with 302');
    t.end();
  });
});

test('Testing database connection', (t) => {
  const sql = '';
  connection.query(sql, (err, res) => {
    if (err) {
      t.notOk(!err, err);
      t.end();
    } else {
      t.equal(res != null, true, 'Should not be empty');
      t.end();
    }
  });
});

test('Testing queries on the database', (t) => {
  const sql = 'SELECT * FROM users';
  connection.query(sql, (err, res) => {
    if (err) {
      t.notOk(!err, err);
      t.end();
    } else {
      t.equal(res.rows.length, 4, 'Should not be empty');
      t.end();
      connection.end();
    }
  });
});

test('Testing queries on the database', (t) => {
  const sql = 'SELECT * FROM posts';
  connection.query(sql, (err, res) => {
    if (err) {
      t.notOk(!err, err);
      t.end();
    } else {
      t.equal(res.rows.length, 3, 'Should not be empty');
      t.end();
      connection.end();
    }
  });
});
