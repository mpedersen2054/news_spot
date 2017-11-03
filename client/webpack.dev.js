const path = require('path')
let loaders = require('./webpack.loaders')

loaders.push({
    test: /\.scss$/,
    loaders: ['style-loader', 'css-loader?importLoaders=1', 'sass-loader'],
    exclude: ['node_modules']
})

module.exports = {
    entry: path.resolve('client', 'index.js'),

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },

    module: {
        rules: loaders
    }
}
