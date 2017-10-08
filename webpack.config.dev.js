import path from "path";

export default {
    devtool:'eval-souce-map',
    entry: path.join(__dirname, '/client/index.js'),
    output: {
        path:path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, '/client'),
                loader: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*','.js', '.jsx']
    }
}