const express = require("express");

const TaskController = require("../controllers/task.controler");

const router = express.Router();

router.get("/", async (req, res) => {
    return new TaskController(res, req).getTasks();
});

router.get("/:id", async (req, res) => {
    return new TaskController(res, req).getTaskById();
});

router.post("/", async (req, res) => {
    return new TaskController(res, req).getCreateTask();
});

router.patch("/:id", async (req, res) => {
    return new TaskController(res, req).getUpdateTask();
});

router.delete("/:id", async (req, res) => {
    return new TaskController(res, req).getDeleteTask();
});

module.exports = router;
