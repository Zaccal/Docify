import runner from '../runner'

runner('default').catch((error) => {
  console.error(error)
  process.exitCode = 1
})
