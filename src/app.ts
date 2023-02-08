import axios from "axios";
import { getCooie } from "./login/login";

async function getCourse(cookie: string) {
	let resp = await axios.get("http://wlxy.jxnxs.com/app/home", {
		headers: {
			"User-Agent":
				"Mozilla/5.0 (Linux; Android 10; MI 9 Build/QKQ1.190825.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/83.0.4103.106 Mobile Safari/537.36",
			Cookie: cookie,
		},
	});
	console.log(resp.data);
}
getCooie("110371").then((cookie) => {
	getCourse(cookie);
});
