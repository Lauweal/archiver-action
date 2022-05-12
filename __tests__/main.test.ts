import * as process from 'process'
import * as path from 'path'
import {expect, test} from '@jest/globals'
import run from '../src/run'

test('build', async () => {
  const paths = await run(
    'zip',
    'expos',
    path.join(process.cwd(), 'dist'),
    path.join(process.cwd())
  )
  expect(paths).toEqual(path.join(process.cwd(), `expos.zip`))
})
