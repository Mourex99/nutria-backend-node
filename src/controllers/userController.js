const exampleService = require('../services/exampleService');

exports.getExample = async (req, res) => {
    try {
        const data = await exampleService.getExample();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createExample = async (req, res) => {
    try {
        const newData = await exampleService.createExample(req.body);
        res.status(201).json(newData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
