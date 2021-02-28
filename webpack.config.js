const path = require('path')

module.exports = {
  entry: './src/wol.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'docs')
  }
}
