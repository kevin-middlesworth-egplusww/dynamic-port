#! /usr/bin/env node

// this is a helper script to enable more simple deployment server stops (works from npm stop)
// this little script relies on shelljs
var shell = require('shelljs');

var serverFile = process.env.SERVEFILE || 'server.js'

// get the current elements based off of the parent directory
// the directory structure becomes the key for the site in forever js
var dirArr = shell.pwd().split('/'),
	env = dirArr.pop(),
	project = dirArr.pop(),
	client = dirArr.pop();

var siteId = client + '---' + project + '---' + env;

// compile the stop script
var stopScript = 'pm2 stop ' + serverFile + ' --name ' + siteId;

// start the server
shell.exec(stopScript);
