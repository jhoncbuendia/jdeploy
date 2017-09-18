"use strict";
var CONFIGURATION = (function(){
	return {
		SSH_USERNSME: 'SSH_USERNSME',
		SSH_PWD: 'SSH_PWD',
		BASE_DIR: '/mnt/c/Repositories/deployment',
		GIT_URL: 'https://github.com/jhoncbuendia/sale-point-client.git',
		PROJECT_NAME: 'sale-point-client',
		APP_TO_DEPLOY_PATH: 'angular-app',
		BRANCH_TO_DEPLOY: 'master'
	}
})(); 

module.exports = CONFIGURATION;