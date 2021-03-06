# webpack-debug-plugin

Inject useful debug info to each entry js globally

> Highly inspired by [BannerPlugin](https://webpack.js.org/plugins/banner-plugin/)


## Usage

```bash
npm install --save-dev webpack-debug-plugin

# For Webpack 3
npm install --save-dev webpack-debug-plugin@0.x
```

```javascript
const DebugPlugin = require('webpack-debug-plugin');
// webpack.config.js
{
  plugins: [
    new DebugPlugin(options)
  ]
}
```

## Options

```js
{
  template: Function,
  multiple: boolean,
  variableName: string,
  test: string | RegExp | Array,
  include: string | RegExp | Array,
  exclude: string | RegExp | Array,
}
```

## License

MIT
