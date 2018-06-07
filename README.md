# Slack Service

```
mesg-core service deploy https://github.com/mesg-foundation/service-js-function.git
```

## Tasks

### Execute

#### inputs
| input | type | description |
| --- | --- | --- |
| code | String | a string that contains the exported function with the parameters as arguments:  |
| inputs | String | a valid json that contains all the inputs required by the function. These data will be given as parameters of the function |

```
{
  "code": "module.export = function(params) { return params }",
  "inputs": 42
}
```

or 
```
{
  "code": "module.export = params => params",
  "inputs": "{\"foo\": \"bar\"}"
}
```

#### outputs
| ouput | description |
| --- | --- |
| result | Result of the function |



