const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db.js");

//Middleware
app.use(cors());
app.use(express.json());

// CREATE
app.post("/todos", async (req,res) => {
  try {
    const {description} = req.body
    const newData = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]);

    res.json(newData.rows[0]);
  } catch (err) {
    console.error(err.message)
  }
});

//READ
app.get("/todos", async (req,res) => {
  try {
   const allDatas = await pool.query("SELECT * FROM todo");
   
   res.json(allDatas.rows);
  } catch (err) {
    console.error(err.message)
  }
});

app.get("/todos/:id", async (req,res) => {
  try {
    const {id} = req.params
   const data = await pool.query("SELECT * FROM todo WHERE id = $1", [id])
   res.json(data.rows[0]) 
  } catch (err) {
    console.error(err.message)
  }
});

//UPDATE
app.put("/todos/:id", async (req,res) => {
  try {
    const {id} = req.params; 
   const {description} = req.body;
   
   const updateData = await pool.query("UPDATE todo SET description = $1 WHERE id = $2", [description, id]);
   res.json("Successfully updated!")
  } catch (err) {
    console.error(err.message)
  }
});

//DELETE
app.delete("/todos/:id", async (req,res) => {
  try {
    const {id} = req.params;
    const deleteData = await pool.query ("DELETE FROM todo WHERE id = $1", [id]);

    res.json("Successfully deleted!")
  } catch (err) {
    console.error(err.message)
  }
});

//SERVER
app.listen(1995, () => {
  console.log("Serves is running on port 1995")
});

