const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");

const express = require("express");
const app = express();
// const path = require("path");

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "/views"));

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
  let q = `SELECT count(*) FROM users`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let home = result[0]["count(*)"];
      // console.log(result[0]["count(*):key"]);

      // res.send("work is good ");

      res.render("home.ejs", { home });
    });
  } catch (err) {
    console.log(err);
    console.log("Error inserting data into the database");
  }
});

app.get("/users", (req, res) => {
  let q = `select * from users`;
  try {
    connection.query(q, (err, usrs) => {
      if (err) throw err;

      res.render("showuser.ejs", { usrs });
    });
  } catch (err) {
    console.log(err);
    console.log("Error inserting data into the database");
  }
});

app.get("/users/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `select * from users where id = ${id}`;
  res.render("edit.ejs");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
