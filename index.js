const express = require("express");
const dotenv = require("dotenv");
const TaskRoutes = require("./src/routes/task.routes");

const conectDataBase = require("./src/database/mongoose.database");

dotenv.config();

const app = express();
app.use(express.json());

conectDataBase();
app.use("/tasks", TaskRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`listening on port ${port}`));
