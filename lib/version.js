/*!
 * BioQL®: An efficient Query Language for interpreting genome and proteome.
 * "Everything should be made as simple as possible, but not simpler."
 *                                                          - Albert Einstein.
 * ___________________________________________________________________________
 * CBBL®
 * ~~~~~
 * Computational Biology and Bioinformatics Laboratory
 * Υπολογιστικής Βιολογίας και Βιοπληροφορικής Εργαστήριο
 * ___________________________________________________________________________
 * Architecture and Code Handcrafted by Prabhat Kumar.
 * Architectuur en Code handgemaakt door Prabhat Kumar.
 * @author    : Prabhat Kumar [http://prabhatkumar.org/]
 * @copyright : Sequømics Corporation [http://sequomics.com/]
 * ___________________________________________________________________________
 */


// Invoking strict mode.
"use strict";


// Module dependencies.
var fs    = require('fs');
var path  = require('path');


// Assigning a null.
var root  = null;
// Version Object Literal.
var VERSION = {
  CONFIG:   1,
  MAJOR:    0,
  MINOR:    0,
  MICRO:    1,
  PATCH:    'alpha',
  BRANCH:   'development'
};


// Module dependencies.
const exec    = require('child_process').exec;
const util    = require('util');

const git     = require('git-state');
const Promise = require('es6-promise').Promise;


// @function to export - "version.pinned".
function pin() {
  return version().then(function (v) {
    version.pinned = v;
  });
}

// @function for "version".
function version(callback) {
  // First, find the package.json as this will be our root.
  var promise = findPackage(path.dirname(module.parent.filename))
      .then(function (dir) {
        // Now, try to load the package.
        var v = require(path.resolve(dir, 'package.json')).version;
        if (v && v !== '0.0.0') {
          return v;
        }
        root = dir;
        // else we're in development, give the commit out...
        // get the last commit and whether the working dir is -/dirty/-,
        var promises = [
          branch().catch(function () {
            return 'master';
          }),
          commit().catch(function () {
            return '<none>';
          }),
          dirty().catch(function () {
            return 0;
          }),
        ];
        // use the cached result as the export.
        return Promise.all(promises).then(function (res) {
          var branch = res[0];
          var commit = res[1];
          var dirtyCount = parseInt(res[2], 10);
          var curr = branch + ': ' + commit;
          if (dirtyCount !== 0) {
            curr += ' (' + dirtyCount + ' dirty files.)';
          }
          return curr;
        });
      }).catch(function (error) {
        console.log(error.stack);
        throw error;
      });
      if (callback) {
        promise.then(function (res) {
          callback(null, res);
        }, callback);
      }
  return promise;
}
