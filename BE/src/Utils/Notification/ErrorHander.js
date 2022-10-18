function ErrorHander(statusCode, message) {
    const result = {
      statusCode: statusCode,
      message: message,
    };
  
    return result;
  }
  
  module.exports = ErrorHander;
  