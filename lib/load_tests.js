const nodePath = require('path');
const glob = require("glob");

const TEST_FILES_GLOB = "/**/*_test.*";

module.exports = function loadTests({paths, cwd, requireFunc}) {  
  paths.forEach(function(path) {
    if (isFile(path)) {
      requireFunc(nodePath.resolve(cwd, path));
    } else {
      requireFolder({path, cwd, requireFunc});
    }
  });
};

function isFile(path) {
  return /\..+$/.test(path);
}

function requireFolder({path, cwd, requireFunc}) {
  let folder = nodePath.join(path, TEST_FILES_GLOB);
  
  let files = glob.sync(folder);
  files.forEach(file => requireFunc(nodePath.resolve(cwd, file)));
}