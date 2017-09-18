"use strict";
const CONFIGURATION = require('./configuration.js');
const exec = require('child_process').exec;

let async = require('async');

let execute = (command, callback) => {

	exec(command, {shell: '/bin/bash'}, (err, stdout, stderr) => {
		if(err) {
			callback(err);
		}
		else {
			callback(null);
		}
	})
}
	
async.series(
	[
		function(callback) { 

			const INSTALL_COMMAND = `npm install -g @angular/cli`;
			console.log(`1. Installing dependencies folder`);
			execute(INSTALL_COMMAND, function(err) {
				if(err) callback(err);
				else { 
					console.log("Command executed:")
					console.log(INSTALL_COMMAND);
					callback(null);
				}
			});
		}
	],
	function(err, callback) {
		if(err) {
			console.log("*Error :");
			console.log(err);
		} else {
			console.log('Dependencies installed successfully');
		}
	}
);
