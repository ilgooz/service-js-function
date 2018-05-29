const grpc = require('grpc')
const yaml = require('js-yaml')
const fs = require('fs')
const vm = require('vm')
const proto = grpc.load('./proto/api.proto')
const mesg = new proto.api.Service(
  process.env.MESG_ENDPOINT_TCP,
  grpc.credentials.createInsecure(),
)
const service = yaml.safeLoad(fs.readFileSync("./mesg.yml"))
const listener = mesg.ListenTask({ service })
console.log("Start ListenTask")

const execute = inputs => ({
  output: "result",
  data: vm
    .runInContext(inputs.code, vm.createContext({
      module,
      console,
      require
    }))(inputs.input) || null
})

listener.on('data', ({ executionID, taskKey, inputData }) => {
  const inputs = JSON.parse(inputData)
  let result = null
  switch (taskKey) {
    case "execute":
      result = execute(inputs)
      break;
    default:
      throw new Error("Task doesn't exists")
      break;
  }
  console.log(result)
  mesg.SubmitResult({
    executionID,
    outputKey: result.output,
    outputData: JSON.stringify(result.data)
  }, console.log)
})
