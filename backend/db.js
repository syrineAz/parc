const mysql= require('mysql');
const db=mysql.createConnection({
    host:"localhost",
    user:'root',
    password:"",
    database:"parc_informatique",
})
db.connect((err) => {
    if (err) {
      console.error('Error connecting to database: ' + err.stack);
      return;
    }
    console.log('Connected to database');
});
  
module.exports = db;