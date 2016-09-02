var shell = require('shelljs');

/* ================================================================================
    Dynamic port getter - looks for deployment.json in the current project directory
        if it doesn't exist, the port number defaults to 3000. Based on the parent
        directory name, the port number is set. The current must match environments.type in the
        deployment.json file. If there is no match, it will default to the port for env-dev.
=================================================================================== */

 module.exports = function(callback) {

  var pwd = shell.pwd('./');

  // get the parent directory name
  var parentDir = pwd.split('/').pop();

  // get list of files in the current directory
  var dirFileListArr = shell.ls('./');

  // name of the deployment json file
  var deployJsonFile = 'deployment.json';

  // check to make sure that the deployment json file exists. if not, return false
  if (dirFileListArr.indexOf(deployJsonFile) == -1) return false;

  // get the deployment.json object
  var environmentsArr = require(pwd + '/' + deployJsonFile).environments;

  // filter the environments array affording to diretory and get the proper port number
  var currentEnvironment = environmentsArr.filter(function(item) {
    // reduce the env/ prefix from the environment names in deployment.json
    if (item.type.replace('env/', '') == parentDir) return item.portNumber;
  });

  // return the port number based on the current environment according to parent folder.
  // Default to env-dev (always first in the deployment.json environments array) if the
  // parent folders do not match the environments listed in the deployments.json file
  callback((currentEnvironment.length) ? currentEnvironment[0].portNumber : environmentsArr[0].portNumber);

}