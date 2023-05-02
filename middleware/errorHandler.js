const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation failed",
        message: err.message,
      });
      break;

    case constants.NOT_FOUND:
      res.json({
        title: "Not found",
        message: err.message,
      });

    case constants.UNAUTHORIZED:
      res.json({
        title: "User unauthorized",
        message: err.message,
      });

    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
      });
      
    default:
      console.log("No error, All Good!");
      break;
  }
};

module.exports = errorHandler;
