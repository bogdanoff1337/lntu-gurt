import { readFileSync } from "fs";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import dotenv from "dotenv";
import laravel from "laravel-vite-plugin";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

dotenv.config();

const clientRoot = path.resolve("resources");

// https://vitejs.dev/config/
export default defineConfig({
	// server: {
	// 	host: "0.0.0.0",
	// },
	plugins: [
		svgr(),
		laravel({
			input: [`${clientRoot}/main/src/main.tsx`],
			refresh: true,
		}),
		react(),
	],
	resolve: {
		alias: [{ find: "@", replacement: `/${clientRoot}/main/src` }],
	},

	css: {
		preprocessorOptions: {
			scss: {
				additionalData: readFileSync(path.resolve(`${clientRoot}main/src/scss/tools/index.scss`), {
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
