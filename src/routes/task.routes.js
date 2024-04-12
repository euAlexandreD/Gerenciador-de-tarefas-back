const express = require("express");
const TaskModel = require("../model/task.model");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const tasks = await TaskModel.find({});
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await TaskModel.findById(taskId);
        if (!task) {
            return res.status(404).send("Task not found");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post("/", async (req, res) => {
    try {
        const newTasks = new TaskModel(req.body);
        await newTasks.save();

        res.status(201).send(newTasks);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskData = req.body;

        const taskToUpdate = await TaskModel.findById(taskId);

        const allowedUpdates = ["isCompleted"];
        const requestdUpdates = Object.keys(taskData);

        for (update of requestdUpdates) {
            if (!allowedUpdates.includes(update)) {
                taskToUpdate[update] = taskData[update];
            } else {
                return res.status(400).send("Invalid update");
            }
        }

        await taskToUpdate.save();
        return res.status(200).send(taskToUpdate);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskToDelete = await TaskModel.findById(taskId);
        if (!taskToDelete) {
            return res.status(404).send("Task not found");
        }

        const deletedTask = await TaskModel.findByIdAndDelete(taskId);
        res.status(200).send(deletedTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
