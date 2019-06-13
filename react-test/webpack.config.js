const argv = require('yargs').argv;
const path = require("path");
const fs = require("fs");

const FileManagerPlugin = require('filemanager-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackOnBuildPlugin = require('on-build-webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const buildFolder = "build";
var env = "dev";

if (argv.prod) {
    env = "prod";
}

const config = JSON.parse(fs.readFileSync(`./config/config.${env}.json`).toString());
config.version = "v=" + Math.floor(Math.random() * 1000);

const bundles = JSON.parse(fs.readFileSync(`./config/bundles.json`).toString());
const htmlPlugins = [];

for (const property of Object.keys(bundles.htmlBundles)) {
    const htmlPlugin = new HtmlWebPackPlugin({
        template: bundles.htmlBundles[property],
        filename: `./${property}.html`,
        chunks: [`${property}`],
    })
    htmlPlugins.push(htmlPlugin);
}

module.exports = {
    mode: "development",
    entry: bundles.jsBundles,
    devtool: "inline-source-map",
    output: {
        path: path.resolve(__dirname, buildFolder),
        filename: "[name].js",
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                    }
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                    }
                ]
            },
            {
                test: /.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: false }
                    }
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        { loader: 'css-loader' },
                        { loader: 'sass-loader' }
                    ]
                })

                // use: [
                //     {
                //         loader: "file-loader",
                //     },
                //     "style-loader",
                //     {
                //         loader: MiniCssExtractPlugin.loader,
                //     },
                //     "css-loader",
                //     "sass-loader",
                // ]
            }
        ]
    },
    plugins: [
        ...htmlPlugins,
        new ExtractTextPlugin({
            filename: '[name].css',
            disable: false,
            allChunks: true
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new FileManagerPlugin({
            onEnd: {
                copy: [
                    { source: `./${buildFolder}/*.js`, destination: `./${buildFolder}/js` },
                    { source: `./${buildFolder}/*.css`, destination: `./${buildFolder}/css` },
                    { source: `./${buildFolder}/*.html`, destination: `./${buildFolder}/html` },
                ],
                delete: [
                    `./${buildFolder}/*.js`,
                    `./${buildFolder}/*.css`,
                    `./${buildFolder}/*.html`,
                ]
            }
        }),
        new WebpackOnBuildPlugin(function (stats) {
            console.log("Hooooraaay!");
        }),
        new HtmlReplaceWebpackPlugin([
            {
                pattern: /\{\{config.title\}\}/,
                replacement: config.title,
            },
            {
                pattern: /\{\{config.siteUrl\}\}/,
                replacement: config.siteUrl,
            },
            {
                pattern: /\{\{version\}\}/,
                replacement: config.version,
            }
        ])
    ]
}