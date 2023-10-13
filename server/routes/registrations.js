const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/add", (req, res) => {
  const body = req.body;
  db.query(
    "INSERT into Registrations (P_id, Date_of_Reg, Candidate_id, Approval ) VALUES ( ? )",
    body.map((d) => [d.pid, d.dor, d.cid, d.approval]),
    (err, result) => {
      if (err) console.error(err);
      else {
        res.send("Registration inserted");
        console.log(result);
      }
    }
  );
});

router.get("/:id", (req, res) => {
  const r_id = req.params.id;
  db.query(
    "select * from Registrations where R_id = ?",
    [r_id],
    (err, result) => {
      if (err) console.error(err);
      else {
        console.log("sent result");
        res.send(result);
      }
    }
  );
});
router.get("/all/:pid", (req, res) => {
  const p_id = req.params.pid;
  db.query(
    "select * from Registrations where P_id = ?",
    [p_id],
    (err, result) => {
      if (err) console.error(err);
      else {
        console.log("sent result");
        res.send(result);
      }
    }
  );
});

//get registration status for a given property and user
router.get("/reg/:pid/:cid", (req, res) => {
  const pid = req.params.pid;
  const cid = req.params.cid;
  db.query(
    "select * from Registrations where P_id = ? and Candidate_id = ?",
    [pid, cid],
    (err, result) => {
      if (err) console.error(err);
      else {
        console.log("sent result");
        res.send(result);
      }
    }
  );
});

router.put("/reject-all", (req, res) => {
  const body = req.body;
  db.query(
    "update Registrations set Approval = 'Rejected' where Seller_id = ? and Approval = 'Pending'",
    [body.sid],
    (err, result) => {
      if (err) console.error(err);
      else {
        console.log(result);
        res.send("Record updated");
      }
    }
  );
});

router.put("/update", (req, res) => {
  const body = req.body;
  db.query(
    "update Registrations set Date_of_Exp = ?, Approval = ? where R_id = ?",
    [body.doe, body.approval, body.rid],
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
  db.query(
    "delete from Registrations where R_id = ?",
    [body.rid],
    (err, result) => {
      if (err) console.error(err);
      else {
        console.log(result);
        res.send("Record deleted");
      }
    }
  );
});

module.exports = router;
