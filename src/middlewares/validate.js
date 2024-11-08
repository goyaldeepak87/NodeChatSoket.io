const validate = (schema) => (req, res, next) => {
    const { error } = schema.body.validate(req.body);
    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }
    next();
};

module.exports = { validate };
