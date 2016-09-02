#! /usr/bin/env node

// this is a helper script to enable more simple deployment server startups (works from npm start)
// this little script relies on shelljs
var shell = require('shelljs');

var serverBuild = process.env.SERVEBUILD || 'gulp';
var serverFile = process.env.SERVEFILE || 'server.js'

// get the current elements based off of the parent directory
// the directory structure becomes the key for the site in forever js
var dirArr = shell.pwd().split('/'),
	env = dirArr.pop(),
	project = dirArr.pop(),
	client = dirArr.pop();

// build the unique forever id
var siteId = client + '---' + project + '---' + env;

// compile the start script
var startScript = serverBuild + ' && pm2 start -f ' + serverFile + ' --name ' + siteId;

// start the server
shell.exec(startScript);