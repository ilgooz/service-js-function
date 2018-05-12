const grpc = require('grpc')
const yaml = require('js-yaml')
const fs = require('fs')
const vm = require('vm')
const proto = grpc.load('./proto/api.proto')
const mesg = new proto.api.Service(
  process.env.MESG_ENDPOINT,
  grpc.credentials.createInsecure(),
  {}
)
const service = yaml.safeLoad(fs.readFileSync("./mesg.yml"))

console.log("1")

const listener = mesg.ListenTask({ service })

console.log(listener)

listener
  .on('error', console.log)
  .on('end', console.log)
  .on('status', console.log)
  .on('data', ({ executionID, taskKey, inputData }) => {
    console.log("3")
    if (taskKey !== "onExecution") { throw new Error("Task doesn't exists") }
    console.log("4")
    console.log(inputs)
    func = vm.runInContext(inputData.code, vm.createContext({ module, console, require }))
    const res = func(inputData.inputs)
  
    serviceApi.SubmitResult({
      executionID,
      outputKey: "result",
      outputData: res
    }, console.log)
  })