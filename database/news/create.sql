CREATE TABLE news
(
    id SERIAL PRIMARY KEY,
    guid VARCHAR NOT NULL,
    title VARCHAR(200) NOT NULL,
    category VARCHAR(200) NOT NULL,
    categoryTitle VARCHAR(200) NOT NULL,
    slug VARCHAR(200) NOT NULL,
    link VARCHAR(300) NOT NULL,
    description VARCHAR(500) NOT NULL,
    pubdate VARCHAR(100) NOT NULL,
    UNIQUE (guid)
)
