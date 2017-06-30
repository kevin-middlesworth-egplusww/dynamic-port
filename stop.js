#! /usr/bin/env node

// this is a helper script to enable more simple deployment server startups (works from npm start)
// this little script relies on shelljs
var shell = require('shelljs');
var argv = require('minimist')(process.argv.slice(2));
var pwd = shell.pwd('./');

try {
	require('dotenv').config({path: pwd + '/.env'});
} catch(e) {
	console.log(e);
}

var serverBuild = argv.SERVEBUILD || process.env.SERVEBUILD || 'gulp';
var serverFile = argv.SERVEFILE || process.env.SERVEFILE || 'server.js';
var nameSlug = argv.NAMESLUG || process.env.NAMESLUG || null;
var environment = argv.ENVIRONMENT || process.env.ENVIRONMENT || null;
var siteId;

if (!nameSlug) {
	// get the current elements based off of the parent directory
	// the directory structure becomes the key for the site in forever js
	var dirArr = pwd.split('/'),
	env = dirArr.pop(),
	project = dirArr.pop(),
	client = dirArr.pop();

	// build the unique forever id
	siteId = client + '---' + project + '---' + env;
} else {
	siteId = nameSlug + '-' + environment || 'dev';
}

// compile the start script
var stopScript = serverBuild + ' && pm2 stop ' + serverFile + ' --name ' + siteId;

// start the server
shell.exec(stopScript);