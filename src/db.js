import mongoose from 'mongoose';
import config from './config';

export default callback => {
  let db;
  // Connect to the database before starting the application server.
  mongoose.connect(config.mongoUrl, { useMongoClient: true } , function (err, database) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    // Save database object from the callback for reuse.
    db = database;
    console.log("Database connection ready");
    callback(db);
  });
}
