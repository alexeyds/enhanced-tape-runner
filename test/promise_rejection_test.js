import test from "tape";
import { onUnhandledRejection, throwPromiseRejectionError } from "../lib/promise_rejection.js";

test("promise_rejection onUnhandledRejection", function(t) {
  t.timeoutAfter(50);

  let expectedError = new Error("foobar");

  onUnhandledRejection((error) => {
    t.equal(error, expectedError, "calls provided function with correct error");

    t.end();
  });
  
  Promise.reject(expectedError);
});

test("promise_rejection throwPromiseRejectionError", function(t) {
  let expectedError = new Error("foo");

  try {
    throwPromiseRejectionError(expectedError);
    t.fail("throws error");
  } catch(e) {
    t.equal(expectedError.stack, e.message, "throws error with correct message");
  } finally {
    t.end();
  }
});