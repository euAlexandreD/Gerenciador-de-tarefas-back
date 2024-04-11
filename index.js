const express = require("express");
const dotenv = require("dotenv");

const conectDataBase = require("./src/database/mongoose.database");
const TaskModel = require("./src/model/task.model");

dotenv.config();

const app = express();
app.use(express.json());

conectDataBase();

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await TaskModel.find({});
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post("/tasks", async (req, res) => {
    try {
        const newTasks = new TaskModel(req.body);
        await newTasks.save();

        res.status(201).send(newTasks);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.listen(8000, () => console.log("listening on port 8000"));
