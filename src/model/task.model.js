const { Schema, model } = require("mongoose");

const taskSchema = Schema({
    description: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: true,
    },
});

const TaskModel = model("Task", taskSchema);

module.exports = TaskModel;
