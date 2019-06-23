const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const RegExs = require('./src/utils/RegExPatterns')
require('dotenv').config()



const BUILD_FOLDER = 'public'



/** Common Configuration for both server and client */
const config = {

  resolve: {
    extensions: ['.js', '.jsx']
  },

  module: {

    rules: [
      {
        test: RegExs.webpack_script_regex,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: RegExs.webpack_style_regex,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
          publicPath: `/${BUILD_FOLDER}/styles`
        })
      },
      {
        test: RegExs.webpack_images_regex,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            outputPath: 'img/',
            publicPath: 'img/',
            context: 'src/images'
          }
        }
      },
      {
        test: RegExs.webpack_fonts_regex,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            // where to output file in the hierarchy 
            outputPath: `fonts/`, 
            // file address on bundled files ( when u inspect to see where it cames from in chrome inspector) 
            // just b/c we serving the public folder as static folder via express , then we need to point to that directory below
            publicPath: `/fonts/`, //`/${BUILD_FOLDER}/fonts/`, 
            context: 'src/fonts'
          }
        }
      },
    ]
  },

  watchOptions: {
    poll: true,
    ignored: /node_modules/,
  },

  plugins: [
    new ExtractTextPlugin({
      filename: `/styles/app.css`,
      disable: false,
      allChunks: true
    }),


    new webpack.DefinePlugin({
      BASE_API_URL: JSON.stringify(process.env.BASE_API_URL),
      BASE_MEDIA_URL: JSON.stringify(process.env.BASE_MEDIA_URL)
    }),
  ]
}



/** Client Config */
const browserConfig = {

  ...config,


  entry: {
    app: './src/js/client.jsx'
  },

  target: 'web',

  output: {
    path: path.resolve(__dirname, BUILD_FOLDER),
    filename: 'bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/'
  },


  plugins: [
    ...config.plugins,

    new webpack.DefinePlugin({
      __isBrowser__ : 'true',
    })
  ]
}


/** Server Config */
const serverConfig = {

  ...config,

  entry: {
    server: './src/js/server.js'
  },

  target: 'node',
  externals: [nodeExternals()],

  output: {
    // path: __dirname,
    path: path.resolve(__dirname, BUILD_FOLDER),
    filename: 'server.js',
    publicPath: '/'
  },


  module: {
    rules: [
      ...config.module.rules,
      
      // {
      //   test: RegExs.webpack_images_regex,
      //   use: {
      //     loader: 'file-loader',
      //     options: {
      //       name: '[path][name].[ext]',
      //       outputPath: 'public/img/',
      //       publicPath: 'img/',
      //       context: 'src/images'
      //     }
      //   }
      // },
      // {
      //   ...config.module.rules[2],
      //   use: {
      //     ...config.module.rules[2].use,
      //     options: {
      //       ...config.module.rules[2].use.options,
      //       outputPath: `/${BUILD_FOLDER}/img/`,
      //       publicPath: 'img/',
      //     }
      //   }
      // },
      // {
      //   ...config.module.rules[3],
      //   use: {
      //     ...config.module.rules[3].use,
      //     options: {
      //       ...config.module.rules[3].use.options,
      //       outputPath: `/${BUILD_FOLDER}/fonts/`,
      //       publicPath: `fonts/`,
      //     }
      //   }
      // }
    ]
  },

  plugins: [
    ...config.plugins,

    new webpack.DefinePlugin({
      __isBrowser__ : 'false',
    })
  ]
}




module.exports = [browserConfig, serverConfig]
// module.exports = browserConfig // to public folder
// module.exports = serverConfig // to root