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
  console.log(`OUTPATH ----> ${filepath}`)
  if (filepath)
    return core.setOutput('path', path.join(core.getInput('output'), filepath))
  return core.setFailed(`${core.getInput('type')} error`)
}

main()
