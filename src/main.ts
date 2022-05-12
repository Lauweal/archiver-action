import * as core from '@actions/core'
import archiver from 'archiver'
import run from './run'

async function main(): Promise<void> {
  const filepath = await run(
    core.getInput('type') as archiver.Format,
    core.getInput('name'),
    core.getInput('input'),
    core.getInput('output')
  )
  if (filepath) return core.setOutput('path', filepath)
  return core.setFailed(`${core.getInput('type')} error`)
}

main()
