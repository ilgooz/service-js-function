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
listener
  .on('error', console.log)
  .on('end', console.log)
  .on('status', console.log)
  .on('data', ({ executionID, taskKey, inputData }) => {
    if (taskKey !== "execute") { throw new Error("Task doesn't exists") }
    // console.log(inputData)
    // const sandbox = { module, console, require }
    // vm.createContext(sandbox)
    // vm.runInContext(inputData.code, sandbox)
    // // console.log('sandbox', sandbox)
    // const res = sandbox
    mesg.SubmitResult({
      executionID,
      outputKey: "result",
      outputData: JSON.stringify({"foo":"bar"})
    }, console.log)
  })
