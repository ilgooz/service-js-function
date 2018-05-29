## Javascript function

To call this service you need to give the following parameters for the `execute` command:

### code
a string that contains the exported function with the parameters as arguments: 

### inputs
a valid json that contains all the inputs required by the function. These data will be given as parameters of the function

### example

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


