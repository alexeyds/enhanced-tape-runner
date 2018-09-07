function onUnhandledRejection(callback) {
  process.on('unhandledRejection', function(error) { callback(error); });
}

class UnhandledPromiseRejectionError extends Error {}
function throwPromiseRejectionError(error) {
  throw new UnhandledPromiseRejectionError(error.stack);
}

function handlePromiseRejection() {
  onUnhandledRejection(throwPromiseRejectionError);
}

handlePromiseRejection.onUnhandledRejection = onUnhandledRejection;
handlePromiseRejection.throwPromiseRejectionError = throwPromiseRejectionError;

module.exports = handlePromiseRejection;