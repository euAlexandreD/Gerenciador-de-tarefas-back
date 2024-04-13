const TaskModel = require("../model/task.model");
const {
    notFoundError,
    internalServerError,
    objectidError,
} = require("../errors/mongodb.errors");
const { allowedFieldsToUpate } = require("../errors/general.errors");
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
            return internalServerError(this.res);
        }
    }

    async getTaskById() {
        try {
            const taskId = this.req.params.id;
            const task = await TaskModel.findById(taskId);

            if (!task) {
                return notFoundError(this.res);
            }
        } catch (error) {
            if (error instanceof MongooseError.Error.CastError) {
                return objectidError(this.res);
            }
        }
    }

    async getCreateTask() {
        try {
            const newTasks = new TaskModel(this.req.body);
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

            if (!taskToUpdate) {
                return notFoundError(this.res);
            }

            const allowedUpdates = ["isCompleted"];
            const requestdUpdates = Object.keys(taskData);

            for (const update of requestdUpdates) {
                if (allowedUpdates.includes(update)) {
                    taskToUpdate[update] = taskData[update];
                } else {
                    allowedFieldsToUpate(this.res);
                }
            }

            await taskToUpdate.save();
            return this.res.status(200).send(taskToUpdate);
        } catch (error) {
            if (error instanceof MongooseError.Error.CastError) {
                return objectidError(this.res);
            }
            this.res.status(500).send(error.message);
        }
    }

    async getDeleteTask() {
        try {
            const taskId = this.req.params.id;
            const taskToDelete = await TaskModel.findById(taskId);

            if (!taskToDelete) {
                return notFoundError(this.res);
            }

            const deletedTask = await TaskModel.findByIdAndDelete(taskId);
            this.res.status(200).send(deletedTask);
        } catch (error) {
            if (error instanceof MongooseError.Error.CastError) {
                return objectidError(this.res);
            }
            this.res.status(500).send(error.message);
        }
    }
}

module.exports = TaskController;
