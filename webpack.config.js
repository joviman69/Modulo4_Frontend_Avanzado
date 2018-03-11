const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProduction = process.env.ENTORNO == "produccion";
let scssLoaders = [];
if (isProduction) {
    scssLoaders = ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader?url=false&sourceMap=true', 'sass-loader?sourceMap=true']
    });
} else {
    scssLoaders = ['style-loader', 'css-loader?url=false&sourceMap=true', 'sass-loader?sourceMap=true'];
}

module.exports = {

    
    entry: ["babel-polyfill", path.join(__dirname, 'src', 'entry.js')],

    
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    // loaders
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: scssLoaders
            }, {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: path.join(__dirname, 'node_modules')
            }, {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                    'file-loader?name=[name].[ext]&useRelativePath=true',
                    'image-webpack-loader'
                ]
            }, {
                test: /assets.[^img]/,
                use: 'file-loader?name=[name].[ext]&useRelativePath=true'
            }
        ]
    },

    // plugins
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            minify: {
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'detail.html',
            template: path.join(__dirname, 'src', 'detail.html'),
            minify: {
                collapseWhitespace: true
            }
        }),
        new ExtractTextPlugin('style.css')
    ],

    // dev server configuration
    devServer: {
        open: true, // abre el navegador por defecto
        port: 3000, // puerto del servidor web
        overlay: true, // muestra los errores en pantalla
        hot: true,
        contentBase: [path.join(__dirname, 'src'), path.join(__dirname, 'src/includes')],
        watchContentBase: true
    }

};
