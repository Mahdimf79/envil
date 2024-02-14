"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 * - `envs`: An array of environment variable names to check.
 * - `exit`: A boolean value indicating whether to exit the process if any of the environment
 */
var checkIfEnvsAreSet = function (envs, options) {
    var status = false;
    console.log(typeof envs);
    // for (let i = 0; i < envs.length; i++) {
    //   if (!process.env[envs[i]]) {
    //     console.log(envs[i] + ' is not defined');
    //     status = true;
    //   }
    // }
    // if (status) {
    //   if (exit) {
    //     return process.exit(1);
    //   }
    //   return false;
    // }
    // return true;
};
exports.default = checkIfEnvsAreSet;
checkIfEnvsAreSet(['sss']);
