const TaskModel = require("../model/task.model");

class TaskController {
    constructor(res, req) {
        this.res = res;
        this.req = req;
    }

    async getTasks() {
        try {
            const tasks = await TaskModel.find({});
            this.res.status(200).send(tasks);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async getTaskById() {
        try {
            const taskId = this.req.params.id;
            const task = await TaskModel.findById(taskId);
            if (!task) {
                return this.res.status(404).send("Task not found");
            }
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async getCreateTask() {
        try {
            const newTasks = new TaskModel(req.body);
            await newTasks.save();

            this.res.status(201).send(newTasks);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async getUpdateTask() {
        try {
            const taskId = this.req.params.id;
            const taskData = this.res.body;

            const taskToUpdate = await TaskModel.findById(taskId);

            const allowedUpdates = ["isCompleted"];
            const requestdUpdates = Object.keys(taskData);

            for (update of requestdUpdates) {
                if (!allowedUpdates.includes(update)) {
                    taskToUpdate[update] = taskData[update];
                } else {
                    return this.res.status(400).send("Invalid update");
                }
            }

            await taskToUpdate.save();
            return this.res.status(200).send(taskToUpdate);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async getDeleteTask() {
        try {
            const taskId = this.req.params.id;
            const taskToDelete = await TaskModel.findById(taskId);
            if (!taskToDelete) {
                return this.res.status(404).send("Task not found");
            }

            const deletedTask = await TaskModel.findByIdAndDelete(taskId);
            this.res.status(200).send(deletedTask);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }
}

module.exports = TaskController;
