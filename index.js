const express = require("express");
const dotenv = require("dotenv");

const conectDataBase = require("./src/database/mongoose.database");
const TaskModel = require("./src/model/task.model");

dotenv.config();

const app = express();

conectDataBase();

app.get("/", async (req, res) => {
    const tasks = await TaskModel.find({});
    res.status(200).send(tasks);
});

app.listen(8000, () => console.log("listening on port 8000"));
