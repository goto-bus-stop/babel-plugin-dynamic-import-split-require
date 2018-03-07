# babel-plugin-dynamic-import-split-require

babel plugin to compile `import()` syntax to `split-require`, the commonjs bundle splitting library

> v2+ of this plugin works with `split-require@3.1.0` and up.
> Install `babel-plugin-dynamic-import-split-require@1.x` if you are using an older version.

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]

[npm-image]: https://img.shields.io/npm/v/babel-plugin-dynamic-import-split-require.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/babel-plugin-dynamic-import-split-require
[travis-image]: https://img.shields.io/travis/goto-bus-stop/babel-plugin-dynamic-import-split-require.svg?style=flat-square
[travis-url]: https://travis-ci.org/goto-bus-stop/babel-plugin-dynamic-import-split-require
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard

## Install

```
npm install babel-plugin-dynamic-import-split-require
```

## Usage

In .babelrc:

```json
{
  "plugins": [
    "dynamic-import-split-require"
  ]
}
```

### Input

```js
import('whatever').then(onwhatever)
```

### Output

```js
var _import = require('split-require');

new Promise(function (resolve, reject) {
  _import("whatever", function (err, exports) {
    if (err) reject(err);else resolve(exports);
  });
}).then(onwhatever);
```

This code can be bundled by browserify using the [`split-require`](https://github.com/goto-bus-stop/split-require#readme) plugin.

## License

[Apache-2.0](LICENSE.md)
