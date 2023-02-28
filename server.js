const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

const DB_LOCAL = process.env.DATABASE_LOCAL;

mongoose.connect(DB).then((con) => {
  console.log('DB connection successful!');
});

const hostName = 'localhost';
const port = 5000 || process.env.PORT;

//Start server
app.listen(port, hostName, () => {
  console.log(`Server running at http://${hostName}:${port}`);
});
