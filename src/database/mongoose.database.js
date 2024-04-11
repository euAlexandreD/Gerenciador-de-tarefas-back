const mongoose = require("mongoose");

const conectDataBase = async () => {
    await mongoose.connect(
        `mongodb+srv://${process.env.BD_USERNAME}:${process.env.DB_PASSWORD}@databasetaskmanenger.ffno9fu.mongodb.net/?retryWrites=true&w=majority&appName=DataBaseTaskManenger`,
        () => console.log("conected to database")
    );
};

module.exports = conectDataBase;
