import * as core from '@actions/core'
import archiver from 'archiver'
import fs from 'fs'
import path from 'path'

export default function run(
  type: archiver.Format,
  name: string,
  input: string,
  output: string
): Promise<string> {
  // 不存在创建文件夹
  if (!fs.existsSync(output)) {
    fs.mkdirSync(output)
  }
  return new Promise<string>(res => {
    const task = archiver(type, { zlib: { level: 9 } })
    const filepath = path.join(output, `${name}.${type}`)
    const stream = fs.createWriteStream(filepath)
    task.pipe(stream)
    task.on('close', () => {
      core.info(`FILE ---> ${filepath}`)
      res(path.join(output, `${name}.${type}`))
    })

    task.on('error', () => {
      task.destroy()
      res('')
    })

    task.on('finish', () => {
      task.destroy()
    })
    task.directory(`${input}`, false)
    task.finalize()
  })
}
