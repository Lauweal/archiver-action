import * as core from '@actions/core'
import archiver from 'archiver'
import path from 'path'
import run from './run'

async function main(): Promise<void> {
  const filepath = await run(
    core.getInput('type') as archiver.Format,
    core.getInput('name'),
    path.join(process.cwd(), core.getInput('input')),
    path.join(process.cwd(), core.getInput('output'))
  )
  core.info(`FILE ---> ${filepath}`)
  core.info(`CWD ---> ${process.cwd()}`)
  if (filepath) {
    const pathname = filepath.replace(process.cwd(), '')
    console.log(`OUTPATH ----> ${pathname}`)
    return core.setOutput('path', pathname)
  }
  return core.setFailed(`${core.getInput('type')} error`)
}

main()
