import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'murugeshwari@02', // change this!
  database: 'lost_found_db'   // make sure this matches your actual database
});

db.connect((err) => {
  if (err) {
    console.error('DB connection failed:', err.message);
  } else {
    console.log('Connected to MySQL database');
  }
});

export default db;
