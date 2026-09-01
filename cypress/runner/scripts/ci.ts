import runner from '../runner'

runner('ci').catch((error) => {
  console.error(error)
  process.exitCode = 1
})
