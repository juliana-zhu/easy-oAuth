module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        // "modules": false，否则 Babel 会在 Rollup 有机会做处理之前，将我们的模块转成 CommonJS，导致 Rollup 的一些处理失败
        "modules": false,
        "useBuiltIns": "usage",
        "corejs": "2.6.10",
        "targets": {
          "ie": 10
        }
      }
    ]
  ],
  "plugins": [
    // 解决多个地方使用相同代码导致打包重复的问题
    ["@babel/plugin-transform-runtime"]
  ],
  "ignore": [
    "node_modules/**"
  ]
}
