const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");

const express = require("express");
const app = express();

const { v4: uuidv4 } = require("uuid");

const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
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
  let q = `select * from users where id = '${id}'`;
});

app.patch("/users/:id", (req, res) => {
  let { id } = req.params;
  let q = `SELECT *FROM users WHERE id='${id}'`;
  let { password: formpass, username: newUsername } = req.body;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let users = result[0];
      if (formPass != users.password) res.send("wrong password");
      else {
        let q2 = `UPDATE users SET username='${newUsername}' WHERE id='${id}'`;
        connection.query(q2, (err, result) => {
          if (err) throw err;
          res.redirect(result);
        });
      }
    });
  } catch (err) {
    console.log(err);
    console.log("Error inserting data into the database");
  }
});

app.get("/users/new", (req, res) => {
  res.render("adduser.ejs");
});

app.post("/users/new", (req, res) => {
  let { username, email, password } = req.body;
  let id = uuidv4();
  //Query to Insert New User
  let q = `INSERT INTO users  (id, username, email, password) VALUES ('${id}','${username}','${email}','${password}') `;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      console.log("added new user");
      res.redirect("/users");
    });
  } catch (err) {
    res.send("some error occurred");
  }
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

// app.patch("/users/:id", (req, res) => {
//   let { id } = req.params;
//   let { password: formpass, username: newUsername } = req.body;
//   let q = `select * from users where id = '${id}'`;
//   try {
//     connection.query(q, (err, result) => {
//       if (err) throw err;
//       let users = result[0];
//       if (formpass != users.password) res.send("Wrong password");
//       else {
//         let q2 = `UPDATE users SET username='${newUsername}' WHERE id='${id}'`;
//         connection.query(q2, (err, result) => {
//           if (err) throw err;
//           res.redirect(result);
//         });
//       }
//     });
//   } catch (err) {
//     console.log(err);
//     console.log("Error inserting data into the database");
//   }
// });
