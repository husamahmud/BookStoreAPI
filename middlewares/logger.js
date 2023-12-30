const logger = (req, res, next) => {
    const startTime = new Date();
    const method = req.method;
    const url = req.originalUrl;

    res.on("finish", () => {
        const endTime = new Date();
        const responseTime = endTime - startTime;
        const statusCode = res.statusCode;

        console.log(`${startTime.toLocaleString()}, ${method} ${url} ${statusCode} ${responseTime}ms`);
    });

    next();
};

module.exports = logger;
