# sql_nodejs_a3

`docker compose up`
`docker attach nodeapp`
`cd code`
express and body-parser: `npm install express body-parser --save`
Install mysql: `npm install mysql --save`
`node server`
open in browser, it will automatically call GET on /init and create the db and table.

structure of files:
./
    db/
    |
    public/
    |       index.html
    |
    docker-compose.yml
    |
    server.js
    |
    README.md