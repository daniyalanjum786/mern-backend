class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;

// i am not using this file for the time being to handle errors
