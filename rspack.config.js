const path = require("path")
const pkg = require("./package.json")
const { VueLoaderPlugin } = require("vue-loader")
const rspack = require("@rspack/core")

module.exports = (env, argv) => {
    console.log("[rspack] mode: ", argv.mode)
    return {
        target: "web",
        devtool: argv.mode === "production" ? false : "inline-source-map",
        builtins: {
            html: [{ template: "./dev/index-template.html" }],
        },
        entry: {
            app: "./src/index.ts",
        },

        devServer: {
            port: 8852,
        },

        resolve: { extensions: [".tsx", ".ts", ".jsx", ".js", ".vue"] },
        output: {
            filename: "[name].js",
            path: path.resolve(__dirname, "dist"), // Compile into a folder called "dist"
        },
        experiments: {
            css: false,
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ["vue-style-loader", "css-loader"],
                    type: "javascript/auto",
                },
                {
                    test: /\.scss$/,
                    type: "javascript/auto",
                    use: [
                        {
                            loader: "vue-style-loader",
                        },
                        { loader: "css-loader" },
                        {
                            loader: "sass-loader",
                            options: {},
                        },
                    ],
                },
                { test: /\.(png|jpg|gif|svg|ttf|eot|woff|woff2|cur|zip)$/, type: "asset/inline" },
                {
                    test: /\.vue$/,
                    loader: "vue-loader",
                },
                {
                    test: /\.m?js/,
                    type: "javascript/auto",
                    resolve: {
                        fullySpecified: false,
                    },
                },
                {
                    test: /\.ts$/,
                    loader: "builtin:swc-loader",
                    options: {
                        sourceMap: true,
                        jsc: {
                            parser: {
                                syntax: "typescript",
                            },
                        },
                        env: {
                            targets: "Chrome >= 48",
                        },
                    },
                    type: "javascript/auto",
                },
                {
                    test: /\.json$/,
                    type: "json",
                },
            ],
        },
        plugins: [
            // 请确保引入这个插件！
            new VueLoaderPlugin(),
            new rspack.DefinePlugin({
                __VUE_PROD_DEVTOOLS__: true,
                APP_VER: `"${pkg.version}"`,
            }),
        ],
    }
}
