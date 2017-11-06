// WEBPACK FOR DEVELOPMENT
let webpack = require('webpack'),
    path = require('path'),
    loaders = require('./webpack.loaders'),
    HtmlWebpackPlugin = require('html-webpack-plugin')
    // ExtractTextPlugin = require('extract-text-webpack-plugin')

const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || '8080'

loaders.push({
    test: /\.scss$/,
    loaders: ['style-loader', 'css-loader?importLoaders=1', 'sass-loader'],
    exclude: ['node_modules']
})

module.exports = {
    entry: path.resolve('client', 'index.js'),
    entry: [
        'react-hot-loader/patch',
        path.resolve('client', 'index.js'), // your app's entry point
    ],

    devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',

    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
        // publicPath: '/public/'
    },

    module: {
        rules: loaders
    },

    // devServer: {
    //     contentBase: path.resolve(__dirname, 'client', 'public'),
    //     noInfo: true, // do not print bundle build stats
    //     hot: true, // enable Hot Module Reloading
    //     inline: true, // embed the webpack-dev-server runtime into the bundle
    //     historyApiFallback: true, // serve index.html in place of 404 responses to allow HTML5 history
    //     port: PORT,
    //     host: HOST
    // },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
        // new ExtractTextPlugin({
        //     filename: 'style.css',
        //     allChunks: true
        // }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'template.html'),
            files: {
                css: ['style.css'],
                js: ['bundle.js']
            }
        })
    ]
}
