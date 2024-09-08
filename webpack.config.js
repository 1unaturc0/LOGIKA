const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	entry: "./src/index.tsx",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "index.js",
	},
	mode: process.env.NODE_ENV === "production" ? "production" : "development",
	resolve: {
		extensions: [".tsx", ".ts", ".jsx", ".js"],
		alias: {
			"#": path.resolve(__dirname, "src"),
		},
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: "ts-loader",
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_nodules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", ["@babel/preset-react", { runtime: "automatic" }]],
					},
				},
			},
			{
				test: /\.module\.css$/,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
							modules: {
								namedExport: false,
							},
						},
					},
				],
			},
			{
				test: /\.css$/,
				exclude: /\.module\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "public/index.html",
			favicon: "public/favicon.ico",
		}),
		new CopyPlugin({
			patterns: [
				{ from: "public/images", to: "images" },
				{ from: "public/locales", to: "locales" },
			],
		}),
		new ESLintWebpackPlugin({
			configType: "flat",
			eslintPath: "eslint/use-at-your-own-risk",
		}),
	],
};
