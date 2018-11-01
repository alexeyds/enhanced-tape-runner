function onUnhandledRejection(callback) {
  process.on('unhandledRejection', function(error) { callback(error); });
}

class UnhandledPromiseRejectionError extends Error {}

function throwPromiseRejectionError(error) {
  if (error instanceof Error) {
    throw error;
  } else {
    throw new UnhandledPromiseRejectionError(JSON.stringify(error));
  }
}

function handlePromiseRejection() {
  onUnhandledRejection(throwPromiseRejectionError);
}

handlePromiseRejection.onUnhandledRejection = onUnhandledRejection;
handlePromiseRejection.throwPromiseRejectionError = throwPromiseRejectionError;

module.exports = handlePromiseRejection;