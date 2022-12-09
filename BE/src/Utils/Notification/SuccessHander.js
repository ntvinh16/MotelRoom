function SuccessHander(statusCode, message, data, data2) {
    const result = {
      statusCode: statusCode,
      message: message,
      data: data,
      data2: data2
    };
  
    return result;
  }
  
  module.exports = SuccessHander;
