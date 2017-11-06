// WEBPACK FOR PRODUCTIOn
let webpack = require('webpack'),
    path = require('path'),
    loaders = require('./webpack.loaders'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    WebpackCleanupPlugin = require('webpack-cleanup-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin')

loaders.push({
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader?sourceMap&localIdentName=[local]___[hash:base64:5]!sass-loader?outputStyle=expanded'
    }),
    exclude: ['node_modules']
})

module.exports = {
    // entry: [
    //     './index.js', './styles/main.scss'
    // ],
    entry: path.resolve('client', 'index.js'),
    output: {
        publicPath: './',
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: loaders
    },
    plugins: [
        new WebpackCleanupPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                drop_console: true,
                drop_debugger: true
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new ExtractTextPlugin({filename: 'style.css', allChunks: true}),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'template.html'),
            files: {
                css: ['style.css'],
                js: ['bundle.js']
            }
        })
    ]
}
