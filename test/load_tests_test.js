import test from "tape";
import path from 'path';

import loadTests from "../lib/load_tests.js";

const FIXTURES_DIR = "test/fixtures";

test("loadTests", function(t) {
  t.test("with filepath", function(t) {
    let requireFunc = buildRequireSpy();
    let cwd = process.cwd();
    loadTests({paths: ["foo.js"], cwd, requireFunc});

    let expectedRequire = path.resolve(cwd, "foo.js");
    t.same(requireFunc.calledWith, {0: expectedRequire}, "requires resolved cwd/filepath");
    
    t.end();
  });

  t.test("with path to dir", function(t) {
    let requireFunc = buildRequireSpy();
    let cwd = process.cwd();
    loadTests({paths: [FIXTURES_DIR], cwd, requireFunc});

    let expectedRequires = {0: fixtureA(cwd), 1: fixtureB(cwd)};

    t.same(requireFunc.calledWith, expectedRequires, "requires all files matching _test.* inside provided directory");
    
    t.end();
  });

  t.test("with multiple paths", function(t) {
    let requireFunc = buildRequireSpy();
    let cwd = process.cwd();
    loadTests({paths: ["foo.js", FIXTURES_DIR], cwd, requireFunc});

    let filePath = path.resolve(cwd, "foo.js");
    let expectedRequires = {0: filePath, 1: fixtureA(cwd), 2: fixtureB(cwd) };

    t.same(requireFunc.calledWith, expectedRequires, "requires resolved cwd/filepath");
    
    t.end();
  });
  
  t.end();
});

function buildRequireSpy() {
  let callsCounter = 0;
  
  let spy = function(arg) { 
    spy.calledWith[callsCounter] = arg; 
    callsCounter++; 
  };

  spy.calledWith = {};
  return spy;
}

function fixtureA(cwd) {
  return fixtureFilePath(cwd, "a_test.js");
}

function fixtureB(cwd) {
  return fixtureFilePath(cwd, "b_test.jsx");
}

function fixtureFilePath(cwd, file) {
  return path.resolve(cwd, FIXTURES_DIR, file);
}