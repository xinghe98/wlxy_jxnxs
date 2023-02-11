import axios from "axios";
import config from "../settings/settings";

const requests = axios.create({
	headers: {
		"User-Agent":
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
	},
});

requests.interceptors.response.use((resp) => {
	if (resp["headers"]["set-cookie"] && !resp["headers"]["set-cookie"].includes("WLXY=wlxy1_80")) {
		const cookies = resp["headers"]["set-cookie"].join(";");
		requests.defaults.headers.common["Cookie"] = cookies;
		return Promise.resolve(resp);
	} else {
		console.log("响应拦截器:没有新的cookie生成" + resp["headers"]["set-cookie"]);
		return Promise.resolve(resp);
	}
});

export default requests;
