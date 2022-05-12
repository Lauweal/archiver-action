import archiver from 'archiver'
import fs from 'fs'
import path from 'path'

export default function run(
  type: archiver.Format,
  name: string,
  input: string,
  output: string
): Promise<string> {
  return new Promise<string>(res => {
    const task = archiver(type, {zlib: {level: 9}})
    const stream = fs.createWriteStream(path.join(output, `${name}.${type}`))
    task.pipe(stream)
    task.on('close', () => {
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
