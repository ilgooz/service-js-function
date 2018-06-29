const vm = require('vm')
const MESG = require("mesg-js").service()

const execute = ({ inputs, code }, { result }) => {
  const func = vm.runInContext(code, vm.createContext({ module, console, require }))
  result(func(inputs))
}

MESG.listenTask({ execute })
