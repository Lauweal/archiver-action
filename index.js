const path = require('path')
const run = require('./lib/run')

run.default(
  'zip',
  'expos',
  path.join(process.cwd(), 'dist/'),
  path.join(process.cwd())
)