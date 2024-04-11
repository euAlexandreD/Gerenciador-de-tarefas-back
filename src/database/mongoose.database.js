const mongoose = require("mongoose");

const conectDataBase = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@databasetaskmanenger.ffno9fu.mongodb.net/?retryWrites=true&w=majority&appName=DataBaseTaskManenger`,
            (error) => {
                if (error) {
                    return console.log(
                        `Cloud not connect to database: ${error}`
                    );
                } else {
                    console.log("Connected to database");
                }
            }
        );
    } catch (error) {
        console.log(`Cloud not connect to database: ${error}`);
    }
};

module.exports = conectDataBase;
