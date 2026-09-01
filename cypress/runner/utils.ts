import { spawn } from 'node:child_process'

export function runCommand(
  command: string,
  args: string[],
  env: Record<string, string>,
  stdio: 'inherit' | 'ignore' = 'inherit'
) {
  return new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, {
      stdio,
      env: {
        ...process.env,
        ...env
      }
    })

    child.on('exit', (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`${command} failed`))
      }
    })
  })
}

export async function waitForServer(url: string) {
  for (let i = 0; i < 60; i++) {
    try {
      const response = await fetch(url)

      if (response.ok || response.status < 500) {
        return
      }
    } catch (error) {
      if (error instanceof Error && i > 59) {
        console.log(`⏳ Server not ready yet: ${error.message}`)
      } else if (i > 59) {
        console.log('⏳ Server not ready yet')
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  throw new Error("Next.js didn't start")
}
