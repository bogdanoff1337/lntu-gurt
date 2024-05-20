import { readFileSync } from "fs";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import dotenv from "dotenv";
import laravel from "laravel-vite-plugin";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

dotenv.config({ path: "../../.env" });

export default defineConfig({
	plugins: [
		svgr(),
		laravel({
			input: ["./src/main.tsx"],
			buildDirectory: "main",
			publicDirectory: "../../public",
			refresh: true,
		}),
		react(),
	],
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
		__API__: JSON.stringify(process.env.APP_URL),
	},
});
