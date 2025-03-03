const {
  ValidationError,
  DatabaseError,
  ForeignKeyConstraintError,
  UniqueConstraintError,
} = require("sequelize");

const errorHandler = (err, req, res, next) => {
  console.log("Error Handler: ", err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err instanceof ValidationError) {
    statusCode = 400;
    message = err.errors.map((error) => error.message).join(", ");
  } else if (err instanceof ForeignKeyConstraintError) {
    statusCode = 400;
    message = "Invalid foreign key constraint";
  } else if (err instanceof UniqueConstraintError) {
    statusCode = 400;
    message = "Unique constraint error";
  } else if (err instanceof DatabaseError) {
    statusCode = 500;
    message = "Database error";
  }

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

module.exports = { errorHandler };
