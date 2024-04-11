const express = require("express");
const dotenv = require("dotenv");

const conectDataBase = require("./src/database/mongoose.database");

dotenv.config();

const app = express();

conectDataBase();

app.get("/", (req, res) => {
    const tasks = [{ description: "estudar programacao", isCompleted: false }];
    res.status(200).send(tasks);
});

app.listen(8000, () => console.log("listening on port 8000"));
