var path = require('path');

module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
    devServer: {
      contentBase: path.join(__dirname, "/public/"),
      historyApiFallback: true
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
                            presets: ['es2015', 'react', 'stage-2']
                        }
          }
        },
        {
          test: /\.(scss|css)$/,
          use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }
          ]
        }
      ]
    },
    output: {
      path: __dirname + "/public/",
      filename: "bundle.js",
      chunkFilename: '[name].js'
    },
    mode: 'development'
};
