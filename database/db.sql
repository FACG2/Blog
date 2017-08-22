BEGIN;

DROP TABLE IF EXISTS users, posts, comments cascade ;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(30) NOT NULL
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(100) NOT NULL,
  contents text NOT NULL,
  post_date date,
  user_id integer references users(id)
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY NOT NULL,
  contents text NOT NULL,
  comment_date date,
  post_id integer references posts(id),
  user_id integer references users(id)
);

INSERT INTO users (name, email, password) VALUES
('aia', 'aaa_2008azhar@hotmail.com', '44567aya#'),
('mahmoud', 'mrm7moud@hotmail.com', '123456');

INSERT INTO posts (title, contents, post_date, user_id) VALUES
('blog', 'hello', '2017-08-22',1),
('aaaa', 'welcome', '2017-08-22',2);

INSERT INTO comments (contents, comment_date, user_id, post_id) VALUES
('my blog', '2017-08-22', 1,1),
('nice post', '2017-08-22',2,2);
COMMIT ;
