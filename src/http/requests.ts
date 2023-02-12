import axios from "axios";
import config from "../settings/settings";

const requests = axios.create({
	headers: {
		"User-Agent":
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
	},
	proxy: {
		host: "127.0.0.1",
		port: 8888,
	},
});

requests.interceptors.response.use((resp) => {
	if (
		resp["headers"]["set-cookie"] &&
		resp["headers"]["set-cookie"].join(";").includes("SESSION")
	) {
		const cookies = resp["headers"]["set-cookie"].join(";");
		requests.defaults.headers.common["Cookie"] = cookies;
		return Promise.resolve(resp);
	} else {
		return Promise.resolve(resp);
	}
});

export default requests;
