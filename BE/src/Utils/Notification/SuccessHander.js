function SuccessHander(statusCode, message, data) {
    const result = {
      statusCode: statusCode,
      message: message,
      data: data
    };
  
    return result;
  }
  
  module.exports = SuccessHander;
