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

class ErrorUnauthorized extends ResponseError {
  constructor(message = 'Unauthorized') {
    super(401, message);
  }
}

class ErrorInternal extends ResponseError {
  constructor(message = 'Internal error') {
    super(500, message);
  }
}

module.exports = {
  ErrorBadRequest,
  ErrorNotFound,
  ErrorUnauthorized,
  ErrorInternal
};