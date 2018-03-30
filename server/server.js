// require('newrelic');
const app = require('./app.js');
const databaseEngine = process.env.DATABASE_ENGINE || 'mysql';
const port = process.env.PORT || 3010;

app.listen(port, () => console.log(`Express using database ${databaseEngine} listening on port ${port}`));
