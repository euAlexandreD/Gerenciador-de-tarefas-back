const notFoundError = (res) => {
    return res.status(404).send("Task not found");
};

const internalServerError = (res) => {
    return res.status(500).send("Internal server error");
};

const objectidError = (res) => {
    return res.status(500).send("erro ao repurar dados no servidor");
};

module.exports = {
    notFoundError,
    internalServerError,
    objectidError,
};
