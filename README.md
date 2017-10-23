# webpack-debug-plugin

Inject useful debug info to each entry js globally

> Highly inspired by [BannerPlugin](https://webpack.js.org/plugins/banner-plugin/)


## Usage

```bash
npm install --save-dev webpack-debug-plugin
```

```javascript
const DebugPlugin = require('webpack-debug-plugin);
// webpack.config.js
{
  plugins: [
    new DebugPlugin(options)
  ]
}
```

## Options

```json
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
