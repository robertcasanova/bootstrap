#!/usr/bin/env node

/**
 * Git COMMIT-MSG hook for validating commit message
 * See https://docs.google.com/document/d/1rk04jEuGfk9kYzfqCuOlPTSJw3hEDZJTBN5E5f1SALo/edit
 *
 * Installation:
 * >> cd <angular-repo>
 * >> ln -s validate-commit-msg.js .git/hooks/commit-msg
 */
var fs = require('fs');
var util = require('util');


var MAX_LENGTH = 70;
var PATTERN = /^(?:fixup!\s*)?(\w*)(\((\w+)\))?\: (.*)$/;
var IGNORED = /^WIP\:/;
var TYPES = {
  chore: true,
  demo: true,
  docs: true,
  feat: true,
  fix: true,
  refactor: true,
  revert: true,
  style: true,
  test: true
};


var error = function() {
  // gitx does not display it
  // http://gitx.lighthouseapp.com/projects/17830/tickets/294-feature-display-hook-error-message-when-hook-fails
  // https://groups.google.com/group/gitx/browse_thread/thread/a03bcab60844b812
  console.error('INVALID COMMIT MSG: ' + util.format.apply(null, arguments));
};


var validateMessage = function(message) {


  return true;
};


var firstLineFromBuffer = function(buffer) {
  return buffer.toString().split('\n').shift();
};



// publish for testing
exports.validateMessage = validateMessage;

// hacky start if not run by jasmine :-D
if (process.argv.join('').indexOf('jasmine-node') === -1) {
  var commitMsgFile = process.argv[2];
  var incorrectLogFile = commitMsgFile.replace('COMMIT_EDITMSG', 'logs/incorrect-commit-msgs');

  fs.readFile(commitMsgFile, function(err, buffer) {
    var msg = firstLineFromBuffer(buffer);

    if (!validateMessage(msg)) {
      fs.appendFile(incorrectLogFile, msg + '\n', function() {
        process.exit(1);
      });
    } else {
      process.exit(0);
    }
  });
}
