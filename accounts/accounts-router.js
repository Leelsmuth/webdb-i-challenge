const express = require("express");

// database access using knex
const db = require("../data/dbConfig");

const router = express.Router();

router.get("/", (req, res) => {
  // SELECT * FROM accounts;
  // db().select('*').from('posts')
  db("accounts") // returns promise!!!
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(error => {
      res.status(500).json({ message: "this went wrong: " + error.message });
    });
});

router.get("/:id", async (req, res) => {
  // SELECT * FROM accounts WHERE id = id;
  try {
    const result = await db("accounts").where({ id: req.params.id });
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({ message: "this went wrong: " + error.message });
  }
});

router.post("/", async (req, res) => {
  // INSERT INTO posts (name, accounts) VALUES ("a" , "b")
  try {
    const result = await db("accounts").insert({
      name: req.body.name,
      budget: req.body.budget
    });
    res.json("New post got created with an id of " + result[0]);
  } catch (error) {
    res.status(500).json({ message: "this went wrong: " + error.message });
  }
});

router.put("/:id", (req, res) => {
  // UPDATE posts SET title = 'new time', contents = 'the content'
  // WHERE id = 5;
  db("accounts")
    .where({ id: req.params.id })
    .update({
      name: req.body.name,
      budget: req.body.budget
    })
    .then(affectedRecords => {
      console.log(affectedRecords);
      res.json(affectedRecords + " records got changed!");
    })
    .catch(error => {
      res.status(500).json({ message: "this went wrong: " + error.message });
    });
});

router.delete("/:id", (req, res) => {
  // DELETE FROM posts WHERE id = 1;
  db("accounts")
    .where({ id: req.params.id })
    .del()
    .then(affectedRows => {
      res.json(affectedRows + " rows got deleted!!");
    })
    .catch(error => {
      res.status(500).json("this went wrong: " + error.message);
    });
});

module.exports = router;
