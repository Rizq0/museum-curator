const errorHandler = (err, req, res, next) => {
  console.log("Error Handler: ", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

module.exports = { errorHandler };
