const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const {ModuleFederationPlugin} = require("webpack").container;
const dotenv = require('dotenv');

module.exports = () => {

    const env = dotenv.config().parsed;

    console.log('ENV - ', env)

    return {
        entry: "./src/index",
        mode: "development",
        devServer: {
            contentBase: path.join(__dirname, "dist"),
            port: 3001,
        },
        output: {
            publicPath: "auto",
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
        },
        module: {
            rules: [
                {
                    test: /bootstrap\.tsx$/,
                    loader: "bundle-loader",
                    options: {
                        lazy: true,
                    },
                },
                {
                    test: /\.jsx?$/,
                    loader: "babel-loader",
                    exclude: /node_modules/,
                    options: {
                        presets: ["@babel/preset-react"]
                    },
                }, {
                    test: /\.(ts|js)x?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react",
                                "@babel/preset-typescript",
                            ],
                        },
                    },
                }, {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                }, {
                    test: /\.(png|jpg|gif|svg)$/i,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 8192,
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new ModuleFederationPlugin({
                name: "reactApp",
                filename: "remoteEntry.js",
                exposes: {
                    "./AReactComponent": "./src/AReactComponent",
                },
                shared: ["react", "react-dom"]
            }),
            new HtmlWebpackPlugin({
                template: "./public/index.html",
            }),
        ],
    };
};
