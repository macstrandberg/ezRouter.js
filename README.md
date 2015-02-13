# ezRouter.js
A very basic front-end router to handle template loading

## Installing
Initialize ezRouter.js by creating a new instance of it:
`var Router = new ezRouter();`

## Methods
#####`renderTo(element)`

var | type | details
--- | --- | ---
`element` | string | Id of element to render to. With our without leading `#`

#####`when(config)`
var | type | details
--- | --- | ---
`config` | object | An object with config details
 | | `fragment` - `string` - Which url to look for
 | | `templateUrl` - `string` - Path to template
 | | `functionToRun` - `function` - Function to run when template has loaded. May be omitted

#####`otherwise(config)`
var | type | details
--- | --- | ---
`config` | object | An object with config details
| | `redirectTo` - `string` - Where to redirect the user when no `when`-case matches. Defaults to `#` if omitted
| | `templateUrl` - `string` - Path to template