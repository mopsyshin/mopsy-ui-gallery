const path = require('path');

const aliases = {
  'assets': 'src/assets',
  'components': 'src/components',
  'client': 'src/client',
  'pages': 'src/pages',
  'shared': 'src/shared',
  'styles': 'src/styles',
  'stores': 'src/stores',
  'src': 'src',
}

console.log('alias script start');

module.exports = {
  webpack: {},
  jsconfig: {},
}

module.exports.webpack['react-native'] = 'react-native-web';

for (const alias in aliases) {
  const aliasTo = aliases[alias]
  const aliasHasExtension = /\.\w+$/.test(aliasTo)

  module.exports.webpack[alias] = path.resolve(__dirname, aliasTo)
  module.exports.jsconfig[alias + '/*'] = [aliasTo + '/*']
  module.exports.jsconfig[alias] = [
    aliasTo + '/index.js',
    aliasTo + '/index.json',
    aliasTo + '/index.scss',
    aliasTo + '/index.css',
  ]
}

const fs = require('fs');
const jsconfigTemplate = require('./jsconfig.template') || {}
const jsconfigPath = path.resolve(__dirname, 'jsconfig.json')

fs.writeFile(
  jsconfigPath,
  JSON.stringify({
    ...jsconfigTemplate,
    compilerOptions: {
      ...(jsconfigTemplate.compilerOptions || {}),
      paths: module.exports.jsconfig,
    },
  }),
  error => {
    if (error) {
      console.error(
        'Error while creating jsconfig.json from aliases.config.js.'
      )
      throw error
    }
  }
)