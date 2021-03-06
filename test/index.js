var test = require('tape')
var babel = require('babel-core')
var dedent = require('dedent')

var plugin = require.resolve('../')

test('transforms import() to a split-require helper', function (t) {
  t.plan(1)

  var src = babel.transform(dedent`
    import('./whatever').then((whatever) => {
      console.log(whatever)
    })
  `, {
    plugins: [plugin]
  }).code

  t.equal(src, dedent`
    var _import = require('split-require');

    _import('./whatever').then(whatever => {
      console.log(whatever);
    });
  `)
})
