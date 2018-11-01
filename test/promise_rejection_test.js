import test from "tape";
import { onUnhandledRejection, throwPromiseRejectionError } from "../lib/promise_rejection.js";

test("onUnhandledRejection", function(t) {
  t.timeoutAfter(50);

  let expectedError = new Error("foobar");

  onUnhandledRejection((error) => {
    t.equal(error, expectedError, "calls provided function with correct error");

    t.end();
  });
  
  Promise.reject(expectedError);
});

test("throwPromiseRejectionError with error", function(t) {
  let expectedError = new Error("foo");

  try {
    throwPromiseRejectionError(expectedError);
    t.fail("throws error");
  } catch(e) {
    t.equal(e, expectedError, "throws error");
  } finally {
    t.end();
  }
});