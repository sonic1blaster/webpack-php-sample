'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

let appDir = "./app";
let isProduction = (process.env.NODE_ENV === 'production');

const config = {
    entry: {
        application: appDir + '/assets/javascripts/application.js'
    },
    output: {
        path: path.resolve(__dirname, 'public', (isProduction ? 'tmp' : 'assets')),
        filename: '[name].[hash:8].js',
        chunkFilename: '[id].[hash:8].js',
        publicPath: '/public/assets/',
    },
    resolve: {
        modules: ['node_modules'],
        alias: {
            _javascripts: path.resolve(appDir + '/assets/javascripts'),
            _stylesheets: path.resolve(appDir + '/assets/stylesheets'),
            _templates: path.resolve(appDir, 'assets', 'templates'),
            _images: path.resolve(appDir, 'assets', 'images'),
            _fonts: path.resolve(appDir, 'assets', 'fonts'),
            _svg: path.resolve(appDir, 'assets', 'svg')
        }
    },
    resolveLoader: {
        modules: ['node_modules']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: ['lodash'],
                        cacheDirectory: './public/cache/',
                        presets: ['es2015']
                    }
                }
            },
            {
                test: /\.css$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'static/[name].[hash:8].[ext]',
                    },
                },
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', query: { sourceMaps: true, minimize: true } },
                        { loader: 'postcss-loader', options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer')({ browsers: 'last 2 versions' })
                                ];
                            }
                        } },
                        { loader: "less-loader"}
                    ]
                }),
            },
            {
                test: /\.(png|ico|jpg|jpeg|gif|svg)$/i,
                include: [
                    path.resolve(appDir, '/assets/svg'),
                    path.resolve(appDir, '/assets/images')
                ],
                exclude: [path.resolve(appDir, '/assets/fonts')],
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'images/[name].[hash:8].[ext]',
                    },
                },
            },
            {
                test: /\.(ttf|eot|woff|woff2|svg)/i,
                include: [path.resolve(appDir, 'app/assets/fonts')],
                exclude: [
                    path.resolve(appDir, '/assets/svg'),
                    path.resolve(appDir, '/assets/images')
                ],
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[hash:8].[ext]',
                    },
                },
            },
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            _: 'lodash'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            filename: 'vendors.[hash:8].js'
        }),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify("production") // TODO: add env!!!
        }),
        new ExtractTextPlugin({
            filename: 'css/[name].[hash:8].css',
            disable: false,
            allChunks: true
        })
    ]
};

if (isProduction) {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin());
    config.plugins.push(new ManifestPlugin({
        fileName: 'manifest.json',
        publicPath: '/public/assets/',
        // basePath: '/public/tmp/',
        writeToFileEmit: true
    }));
} else {
    config.output.publicPath = 'http://kdvor.lc:5001/public/assets/';
    config.devtool = "cheap-module-source-map";
    config.devServer = {
        publicPath: 'http://kdvor.lc:5001/public/assets/',
        contentBase: path.resolve(__dirname),
        compress: true,
        host: "kdvor.lc",
        port: 5001,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
        // hot: true,
        // inline: true
    };
    config.plugins.push(new ManifestPlugin({
        fileName: 'manifest.json',
        publicPath: 'http://kdvor.lc:5001/public/assets/',
        // basePath: '/public/tmp/',
        writeToFileEmit: true
    }));
}

module.exports = config;