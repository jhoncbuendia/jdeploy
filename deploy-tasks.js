"use strict";
const CONFIGURATION = require('./configuration.js');
const exec = require('child_process').exec;

let async = require('async');
let project_path = `${CONFIGURATION.BASE_DIR}/${CONFIGURATION.PROJECT_NAME}`;

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

			const CREATION_COMMAND = `mkdir -p  ${CONFIGURATION.BASE_DIR}`;
			console.log(`1. Creating ${CONFIGURATION.BASE_DIR} folder`);
			execute(CREATION_COMMAND, function(err) {
				if(err) callback(err);
				else { 
					console.log("Command executed:")
					console.log(CREATION_COMMAND);
					callback(null);
				}
			});
		},
		function(callback) { 
			
			const CLONE_COMMAND = `cd ${CONFIGURATION.BASE_DIR}; git clone  ${CONFIGURATION.GIT_URL}`;
			console.log(`2. Cloning Repository ${CONFIGURATION.GIT_URL}`);
			execute(CLONE_COMMAND, function(err) {
				if(err) {
					if(err.code === 128) {
						console.log('Repository already exist.')
						callback(null);
					} else {
						callback(err);
					}
				}
				else { 
					console.log("Command executed:")
					console.log(CLONE_COMMAND);
					callback(null);
				}
			});
		},
		function(callback) {
			const BRANCH_COMMAND = `cd ${project_path}; git checkout ${CONFIGURATION.BRANCH_TO_DEPLOY}`;
			console.log(`3. Checkout to ${CONFIGURATION.BRANCH_TO_DEPLOY} branch`)
			execute(BRANCH_COMMAND, function(err) {
				if(err) callback(err);
				else {
					console.log(`Command excecuted: ${BRANCH_COMMAND}`);
					callback(null);
				}
			});
		},
		function(callback) {
			const UPDATE_BRANCH_COMMAND = `cd ${project_path}; git pull origin  ${CONFIGURATION.BRANCH_TO_DEPLOY}`;
			console.log(`4. Updating ${CONFIGURATION.BRANCH_TO_DEPLOY} branch`);
			execute(UPDATE_BRANCH_COMMAND, function(err) {
				if(err) callback(err);
				else {
					console.log(`Command excecuted: ${UPDATE_BRANCH_COMMAND}`);
					callback(null);
				}
			});
		},
		function(callback) {
			const INSTALL_COMMAND = `cd ${project_path}/${CONFIGURATION.APP_TO_DEPLOY_PATH}; npm install`;
			console.log(`5. INSTALLING PACKAGES ...`);
			execute(INSTALL_COMMAND, function(err) {
				if(err) callback(err);
				else {
					console.log(`Command excecuted: ${INSTALL_COMMAND}`);
					callback(null);
				}
			});
		},
		function(callback) {
			const RUN_COMMAND = `kill $(sudo lsof -t -i:4200); cd ${project_path}/${CONFIGURATION.APP_TO_DEPLOY_PATH}; ng serve -o`;
			console.log(`6. RUNNING PROJECT`);
			execute(RUN_COMMAND, function(err) {
				if(err) callback(err);
				else {
					console.log(`Command excecuted: ${RUN_COMMAND}`);
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
			console.log('Deployment process completed');
		}
	}
);
