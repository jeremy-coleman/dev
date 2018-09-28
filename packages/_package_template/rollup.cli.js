import pkg from "./package.json";



export default {
	input: "src/cli.ts",
	output: {
		file: pkg["bin"]["my-cli-name"],
		format: "cjs",
		banner: "#!/usr/bin/env node",
	},
	external: [
		"process",
		"fs",
		"path",
	],
	plugins: [
		require("rollup-plugin-tsc")({
			compilerOptions: {
				noUnusedLocals: true,
			},
		}),
	],
};
