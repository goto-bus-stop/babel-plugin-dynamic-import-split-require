module.exports = function (babel) {
  var makeRequire = babel.template(`
    require('split-require')
  `)

  var makeImport = babel.template(`
    new Promise(function (resolve, reject) {
      HELPER(PATH, function (err, exports) {
        if (err) reject(err)
        else resolve(exports)
      })
    })
  `)

  return {
    inherits: require('babel-plugin-syntax-dynamic-import'),

    visitor: {
      Program: {
        enter: function (path) {
          this.helperId = path.scope.generateUidIdentifier('import')
          this.usesImport = false
        },
        exit: function (path) {
          if (this.usesImport) {
            path.scope.push({
              id: this.helperId,
              init: makeRequire().expression
            })
          }
        }
      },
      CallExpression: function (path) {
        if (path.get('callee').isImport()) {
          this.usesImport = true
          path.replaceWith(makeImport({
            HELPER: this.helperId,
            PATH: path.node.arguments[0]
          }))
        }
      }
    }
  }
}
