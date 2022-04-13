module.exports = {
    devtool: 'source-map',
    entry: {
        main: './src/index.js'
    },
    mode: 'development',
    module: {
        rules: [{
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader'
            }],
            test: /\.js$/
        }]
    },
    output: {
        filename: '[name].bundle.js',
        path: __dirname + '/dist'
    }
}