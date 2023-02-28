const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const Tour = require('./../../models/tourModel');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

const DB_LOCAL = process.env.DATABASE_LOCAL;

mongoose.connect(DB).then((con) => {
  console.log('DB connection successful!');
});

//Reac JSON file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

//Import data into DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully imported!');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

//Delete all data from DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully Deleted!');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);

// node dev-data/data/import-dev-data.js --import
// node dev-data/data/import-dev-data.js --delete
