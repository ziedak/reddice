import path from "path";
import webpack from "webpack";

export default {
    devServer: {

        hot: true
    },
    devtool: 'eval-souce-map',
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        path.join(__dirname, '/client/index.js')

    ],
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],

    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, '/client'),
                loader: ['react-hot-loader/webpack', 'babel-loader']
            },

            // Options to configure babel with

        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']

    }
}