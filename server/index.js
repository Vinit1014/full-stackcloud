const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const connection = mysql.createConnection({
//   host: "mysql",
//   user: "root",
//   password: "password",
//   database: "fullstackcloud",
// });

const connection = mysql.createConnection({
    host: "db", // Use the service name of the MySQL container
    user: "root",
    port: 3307,
    password: "password",
    database: "fullstackcloud"
  });

app.post("/submit", (req, res) => {
    const { username, password } = req.body;
    console.log("Submitted data to backend:", { username, password });
  
    // Insert data into MySQL database
    const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    connection.query(sql, [username, password], (err, result) => {
      if (err) {
        console.error("Error inserting data into database:", err);
        res.status(500).send("Error inserting data into database");
        return;
      }
      console.log("Data inserted into database");
      res.status(200).send("Data inserted into database");
    });
});
                   
app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
