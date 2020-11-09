const fb = require('fibonacci')
const { isMainThread, parentPort, workerData } = require('worker_threads')
const Pool = require('worker-threads-pool')
const CPUs = require('os').cpus().length
const pool = new Pool({ max: CPUs - 2 })

const runFibonacci = workerData => {
  return new Promise((resolve, reject) => {
    pool.acquire(__filename, { workerData }, (err, worker) => {
      if (err) reject(err)
      console.log(`started worker (pool size: ${pool.size})`)
      worker.on('message', resolve)
      worker.on('error', reject)
      worker.on('exit', code => {
        if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`))
      })
    })
  })
}

/**
 * If it's not the main thread it's one of the Worker threads
 */
if (!isMainThread) {
  console.log('Not isMainThread')
  const result = fb.iterate(workerData.iterations)
  /**
   * Send a copy the result object back to the main Thread
   */
  parentPort.postMessage(result)
}

if (isMainThread) {
  console.log('Essa é a MainThread')
}

module.exports = runFibonacci
