module.exports = function (babel) {
  var makeRequire = babel.template(`
    require('split-require')
  `)

  var makeDefaultWrapper = babel.template(`
    IMPORT.then(HELPER)
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
          path.get('callee').replaceWith(this.helperId)
          path.replaceWith(makeDefaultWrapper({
            IMPORT: path.node,
            HELPER: this.file.addHelper('interopRequireDefault')
          }))
        }
      }
    }
  }
}
