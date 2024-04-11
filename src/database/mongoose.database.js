const mongoose = require("mongoose");

const conectDataBase = async () => {
    await mongoose.connect(
        `mongodb+srv://${process.env.BD_USERNAME}:${process.env.DB_PASSWORD}@databasetaskmanenger.ffno9fu.mongodb.net/?retryWrites=true&w=majority&appName=DataBaseTaskManenger`,
        (error) => {
            if (error) {
                return console.log(
                    `Cloud not connect to the MongoDB: ${error}`
                );
            } else {
                console.log("Connected to MongoDB");
            }
        }
    );
};

module.exports = conectDataBase;
