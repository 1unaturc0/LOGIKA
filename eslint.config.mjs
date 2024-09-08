import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	pluginReact.configs.flat.recommended,
	pluginReact.configs.flat["jsx-runtime"],
	{
		languageOptions: {
			globals: { ...globals.browser },
		},
		settings: {
			react: {
				version: "detect",
			},
		},
		plugins: {
			"react-hooks": pluginReactHooks,
		},
		rules: {
			...pluginReactHooks.configs.recommended.rules,
		},
	},
	{
		ignores: ["**/dist/*", "**/webpack.config.js"],
	}
);
