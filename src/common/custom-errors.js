class ResponseError extends Error {
  constructor(statusCode, ...params) {
    super(...params);
    this.statusCode = statusCode;
  }
}

class ErrorBadRequest extends ResponseError {
  constructor(message = 'Invalid request') {
    super(400, message)
  }
}

class ErrorNotFound extends ResponseError {
  constructor(message = 'Resource not found') {
    super(404, message)
  }
}

module.exports = {
  ErrorBadRequest,
  ErrorNotFound
};