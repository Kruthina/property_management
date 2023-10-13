const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../db");

router.post("/add", (req, res) => {
  const body = req.body;

  db.query(
    "select count(*) from Users where Email = ?",
    [body.email],
    async (err, result) => {
      if (err) {
        console.error(err);
      } else {
        const count = result[0]["count(*)"];
        if (count > 0) {
          res.status(400).send("User already exists");
        } else {
          const password = await bcrypt.hash(body.password, 10);
          db.query(
            "INSERT into Users (Name, Password, Email, DOB) VALUES (?, ?, ?, ?)",
            [body.name, password, body.email, body.dob],
            (err, result) => {
              if (err) console.error(err);
              else {
                res.send("User/s inserted");
                console.log(result);
              }
            }
          );
        }
      }
    }
  );
});

router.post("/login", async (req, res) => {
  const body = req.body;
  const password = body.password;
  db.query(
    "select * from Users where Email = ?",
    [body.email],
    async (err, result) => {
      if (err) {
        console.error(err);
        res.sendStatus(400);
      } else {
        if (result.length == 0) {
          res.status(206).send("User not found!");
        } else {
          const compare = await bcrypt.compare(password, result[0].Password);
          console.log(compare);
          if (compare) {
            const user = result[0];
            res.status(200).send({
              uid: user.U_id,
              name: user.Name,
              email: user.Email,
            });
          } else {
            res.status(204).send("Email and password do not match");
          }
        }
      }
    }
  );
});

router.post("/add-phone", (req, res) => {
  const body = req.body;
  db.query(
    "INSERT into Users_Phone (U_id, U_Mobile) VALUES ?",
    [body.map((d) => [d.uid, d.mobile])],
    (err, result) => {
      if (err) console.error(err);
      else {
        res.send("User/s phone inserted");
        console.log(result);
      }
    }
  );
});

router.post("/add-address", (req, res) => {
  const body = req.body;
  db.query(
    "INSERT into Users_Add (U_id, U_Add) VALUES ?",
    [body.map((d) => [d.uid, d.address])],
    (err, result) => {
      if (err) console.error(err);
      else {
        res.send("User/s address inserted");
        console.log(result);
      }
    }
  );
});

router.get("/:id/phone", (req, res) => {
  const user_id = req.params.id;
  db.query(
    "select * from Users_Phone where U_id = ?",
    [user_id],
    (err, result) => {
      if (err) console.error(err);
      else {
        res.send(result);
      }
    }
  );
});

router.get("/:id/address", (req, res) => {
  const user_id = req.params.id;
  db.query(
    "select * from Users_Add where U_id = ?",
    [user_id],
    (err, result) => {
      if (err) console.error(err);
      else {
        res.send(result);
      }
    }
  );
});

router.get("/:id", (req, res) => {
  const user_id = req.params.id;
  db.query(
    "select U_id,Name,Email,DOB from Users where U_id = ?",
    [user_id],
    (err, result) => {
      if (err) console.error(err);
      else {
        console.log("sent result");
        res.send(result);
      }
    }
  );
});

router.put("/update", (req, res) => {
  const body = req.body;
  db.query(
    "update Users set Name = ?, Password = ?, DOB = ? where U_id = ?",
    [body.name, body.password, body.dob, body.uid],
    (err, result) => {
      if (err) console.error(err);
      else {
        console.log(result);
        res.send("Record updated");
      }
    }
  );
});

router.delete("/delete", (req, res) => {
  const body = req.body;
  db.query("delete from Users where U_id = ?", [body.uid], (err, result) => {
    if (err) console.error(err);
    else {
      console.log(result);
      res.send("Record deleted");
    }
  });
});
router.delete("/delete-add/:id", (req, res) => {
  const id = req.params.id;
  db.query("delete from Users_Add where Id = ?", [id], (err, result) => {
    if (err) console.error(err);
    else {
      console.log(result);
      res.send("Record deleted");
    }
  });
});
router.delete("/delete-phone/:id", (req, res) => {
  const id = req.params.id;
  db.query("delete from Users_Phone where Id = ?", [id], (err, result) => {
    if (err) console.error(err);
    else {
      console.log(result);
      res.send("Record deleted");
    }
  });
});

module.exports = router;
