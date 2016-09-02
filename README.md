# dynamic-port
Dynamically sets the port number for a site based on path name and config json file.

## Usage

```
var dynamicPort = require('dynamic-port');

dynamicPort(function(port) {
    app.listen(port, function() {
        console.log('Listening on port ' + port);
    });
});
```

##  Configuration
This solution requires a file called `deployment.json`.

The `deployment.json` file provides Mizer Sites with port numbers for the different dev site environments along with Git branch names and other information listed below.
```json
{
  "name": "my new site", 
		// name of the project
  "environments" : [{
  		// array of environments for a dev site
    "type": "env/dev", 
    	// environment type †
    "portNumber": 3013 
    	// port number assigned to this environemt
  },
  {
  		// array of environments for a uat site
    "type": "env/uat", 
    	// environment type †
    "portNumber": 3014 
    	// port number assigned to this environemt
  }]
}
```
† The "type" value corresponds to the Git branch name for a particular environment.

## Port Determination

Corresponding to the `type` value listed in the `environments` array, the port will be
determined based on the current directory of the site. For example, if my site is in
the "uat" directory, port 3014 will be returned. If the site folder is "dev", 3013 will be returned.

"env/dev" is the default when no match exists (works best for local dev'ing).