const exampleModel = require('../models/exampleModel');

exports.getExample = async () => {
    // Lógica para obter dados
    return exampleModel.find();
};

exports.createExample = async (data) => {
    // Lógica para criar dados
    return exampleModel.create(data);
};
