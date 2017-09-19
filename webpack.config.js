const webpack = require('webpack')
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, './functions/src/shell/shell.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './functions/public')
  },
  resolve: {
    modules: [
      path.resolve(__dirname, './functions/node_modules'),
      path.resolve(__dirname, './functions/bower_components')
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, './functions/src/shell/index.ejs'),
      inject: false,
      filename: 'index.html',
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './functions/bower_components/webcomponentsjs/*.js'),
        to: 'bower_components/webcomponentsjs/[name].[ext]'
      },
      {
        from: path.resolve(__dirname, './functions/bower_components/webcomponentsjs/*.map'),
        to: 'bower_components/webcomponentsjs/[name].[ext]'
      }
    ])
  ],
  module: {
    rules: [
      {
        // If you see a file that ends in .html, send it to these loaders.
        test: /\.html$/,
        // This is an example of chained loaders in Webpack.
        // Chained loaders run last to first. So it will run
        // polymer-webpack-loader, and hand the output to
        // babel-loader. This let's us transpile JS in our `<script>` elements.
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'polymer-webpack-loader',
            options: {
              processStyleLinks: true
            }
          }
        ]
      },
      {
        // If you see a file that ends in .js, just send it to the babel-loader.
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              useRelativePath: true,
              name: '[name].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              gifsicle: {
                optimizationLevel: 2
              },
              optipng: {
                optimizationLevel: 5
              },
              mozjpeg: {
                quality: 70,
                progressive: true
              },
              svgo: {
                plugins: [
                  {removeViewBox: true},
                  {cleanupIDs: false}
                ]
              },
              webp: {
                quality: 70,
                method: 5,
                size: 60000
              }
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  }
}