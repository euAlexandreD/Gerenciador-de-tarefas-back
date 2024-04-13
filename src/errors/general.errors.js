const allowedFieldsToUpate = (res) => {
    return res.status(500).send("Um ou mais campos nao sao editaveis");
};

module.exports = {
    allowedFieldsToUpate,
};
