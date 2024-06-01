import { readFileSync } from "fs";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import dotenv from "dotenv";
import laravel from "laravel-vite-plugin";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

enum Mode {
	DOCKER = "docker",
	STAGE = "stage",
	PRODUCTION = "production",
}

dotenv.config({ path: "../../.env" });

export default defineConfig(({ mode }) => {
	const isDocker = mode === Mode.DOCKER;
	const isProduction = mode === Mode.PRODUCTION;

	const plugins = [
		react(),
		svgr(),
	];

	if (isDocker) {
		plugins.push(
			laravel({
				input: ["./src/main.tsx"],
				buildDirectory: "main",
				publicDirectory: "../../public",
				refresh: true,
			}),
		);
	}

	return {
		plugins,
		resolve: {
			alias: [{ find: "@", replacement: "/src" }],
		},
		envDir: "../../",
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: readFileSync(path.resolve("src/scss/tools/index.scss"), {
						encoding: "utf8",
						flag: "r",
					}),
				},
			},
		},
		define: {
			__IS_DEV__: JSON.stringify(true),
			__API__: JSON.stringify(isProduction ? process.env.DEPLOY_APP_URL : process.env.APP_URL),
		},
	};
});
