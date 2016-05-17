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
