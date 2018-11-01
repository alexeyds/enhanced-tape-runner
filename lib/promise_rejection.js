function onUnhandledRejection(callback) {
  process.on('unhandledRejection', function(error) { callback(error); });
}

function throwPromiseRejectionError(error) {
  throw error;
}

function handlePromiseRejection() {
  onUnhandledRejection(throwPromiseRejectionError);
}

handlePromiseRejection.onUnhandledRejection = onUnhandledRejection;
handlePromiseRejection.throwPromiseRejectionError = throwPromiseRejectionError;

module.exports = handlePromiseRejection;