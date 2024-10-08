import axios from "axios";
import { TOKEN_LOCALSTORAGE_KEY } from "../const/localstorage";

export const $api = axios.create({
	baseURL: `${__API__}/api/`,
});

$api.interceptors.request.use(
	(config) => {
		if (localStorage.getItem(TOKEN_LOCALSTORAGE_KEY)) {
			config.headers.Authorization = `bearer ${localStorage.getItem(TOKEN_LOCALSTORAGE_KEY)}`;
		}

		return config;
	},
);

$api.interceptors.response.use(
	(config) => {
		if (localStorage.getItem(TOKEN_LOCALSTORAGE_KEY)) {
			config.headers.Authorization = `bearer ${localStorage.getItem(TOKEN_LOCALSTORAGE_KEY)}`;
		}

		return config;
	},
	(error) => {
		if (error.response.data.message === "Token has expired") {
			return $api.post("auth/refresh", {}, {
				headers: {
					Authorization: `bearer ${error.response.data.access_token}`,
				},
			}).then((response) => {
				localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, response.data.access_token);

				error.config.headers.Authorization = `bearer ${localStorage.getItem(TOKEN_LOCALSTORAGE_KEY)}`;

				return $api.request(error.config);
			});
		}
	},
);
