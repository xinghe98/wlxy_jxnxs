import requests from "./http/requests";
import { getCaptcha, getCooie } from "./login/login";
import config from "./settings/settings";

async function getCourse() {
	await getCaptcha(config.captchaUri);
	await getCooie("110326");
	let resp = await requests.get("http://wlxy.jxnxs.com/app/home");
	console.log(resp.data);
}

getCourse();
