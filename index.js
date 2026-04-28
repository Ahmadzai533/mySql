const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");

const express = require("express");
const app = express();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "delta_app",
  password: "poohan12345",
});

let getUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

app.get("/", (req, res) => {
  let q = `SELECT count(*) as count FROM users`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      console.log(result[0]["count(*)"]);
      res.send("successfully inserted data into the database");
    });
  } catch (err) {
    console.log(err);
    console.log("Error inserting data into the database");
  }

  connection.end();
});


app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
