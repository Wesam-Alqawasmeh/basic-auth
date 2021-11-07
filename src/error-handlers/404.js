"use strtic";

module.exports = (req, res, next) => {
    res.status(404).send({
        error: 404,
        message: "An error occurred!!! Path not found"
    });

    next();
};