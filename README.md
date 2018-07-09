# js-function

Execute a Javascript function

```bash
mesg-core service deploy https://github.com/mesg-foundation/service-js-function.git
```

## Tasks

### execute

Task key: **execute**

#### Inputs

| **key** | **type** | **description** |
| --- | --- | --- |
| **code** | `String` | A string that contains the exported function with the parameters as arguments |
| **inputs** | `Object` | A valid json that contains all inputs required by the function. This data will be given as parameters of the function |


#### Outputs

##### result

Output key: **result**

Result of the function

| **key** | **type** | **description** |
| --- | --- | --- |



