const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/add", (req, res) => {
  const body = req.body;

  db.query(
    "INSERT into Properties (Name, Area, Price, Seller_id, Description, Image) VALUES ?",
    [body.map((d) => [d.name, d.area, d.price, d.sid, d.desc, d.image])],
    (err, result) => {
      if (err) console.error(err);
      else {
        res.send("Property inserted");
        console.log(result);
      }
    }
  );
});

router.get("/all", (req, res) => {
  db.query("select * from Properties where Buyer_id is NULL", (err, result) => {
    if (err) console.error(err);
    else {
      console.log("sent result");
      res.send(result);
    }
  });
});

router.get("/all/seller/:id", (req, res) => {
  const sid = req.params.id;
  db.query(
    "select * from Properties where Seller_id = ?",
    [sid],
    (err, result) => {
      if (err) console.error(err);
      else {
        console.log("sent result");
        res.send(result);
      }
    }
  );
});

router.get("/all/buyer/:id", (req, res) => {
  const bid = req.params.id;
  db.query(
    "select * from Properties where Buyer_id = ?",
    [bid],
    (err, result) => {
      if (err) console.error(err);
      else {
        console.log("sent result");
        res.send(result);
      }
    }
  );
});

router.get("/:id", (req, res) => {
  const p_id = req.params.id;
  db.query("select * from Properties where P_id = ?", [p_id], (err, result) => {
    if (err) console.error(err);
    else {
      res.send(result);
    }
  });
});

router.put("/update", (req, res) => {
  const body = req.body;
  db.query(
    "update Properties set Name = ?, Area = ?, Price = ?, Description = ?, Image = ? where P_id = ?",
    [body.name, body.area, body.price, body.desc, body.image, body.pid],
    (err, result) => {
      if (err) console.error(err);
      else {
        console.log(result);
        res.send("Record updated");
      }
    }
  );
});

router.put("/update-buyer", (req, res) => {
  const body = req.body;
  db.query(
    "update Properties set Buyer_id = ? where P_id = ?",
    [body.bid, body.pid],
    (err, result) => {
      if (err) console.error(err);
      else {
        console.log(result);
        res.send("Record updated");
      }
    }
  );
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  db.query("delete from Properties where P_id = ?", [id], (err, result) => {
    if (err) console.error(err);
    else {
      console.log(result);
      res.send("Record deleted");
    }
  });
});

module.exports = router;
