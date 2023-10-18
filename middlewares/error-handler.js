module.exports.errorHandler = (err, req, res, next) => {
  console.error(
    `Error ${err.name} with the message ${err.message} has occured while executing the code`,
  );
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "An error occured on the server" : message,
  });
};
