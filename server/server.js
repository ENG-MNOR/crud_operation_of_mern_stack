import express from "express";
import mysql from "mysql";
import cors from "cors";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  const sql = "select * from student";
  db.query(sql, (err, result) => {
    if (err) return res.json({ message: "error inside the server" });
    return res.json({ data: result });
  });
});
app.post("/student", (req, res) => {
  const sql = "insert into student(`name`,`email`) values(?)";
  console.log(req.body);
  let values = [req.body.name, req.body.email];

  db.query(sql, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});
app.get("/read/:id", (req, res) => {
  let sql = "select * from student where id=?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});
app.put("/update/:id", (req, res) => {
  let id = req.params.id;
  const sql = "UPDATE `student` SET `name`=?,`email`=? WHERE `id`=?";
  console.log(req.body);
  let values = [req.body.name, req.body.email, id];

  db.query(sql, values, (err, result) => {
    if (err) return res.json(err);
    return res.json({ message: "successfully updated" });
  });
});
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "delete from `student` where `id`=?";
  db.query(sql, id, (err, result) => {
    if (err) return res.json(err);
    return res.json("successfully deleted");
  });
});
app.listen(8081, () => {
  console.log("listening");
});
