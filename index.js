const express = require("express");
const dotenv = require("dotenv");
const TaskRoutes = require("./src/routes/task.routes");

const conectDataBase = require("./src/database/mongoose.database");

dotenv.config();

const app = express();
app.use(express.json());

conectDataBase();
app.use("/tasks", TaskRoutes);

app.listen(8000, () => console.log("listening on port 8000"));
