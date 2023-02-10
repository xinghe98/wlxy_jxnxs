import requests from "./http/requests";
import { getCaptcha, getCooie } from "./login/login";
import config from "./settings/settings";
import courseInfo from "./course/courseInfo";

async function getCourse() {
	await getCaptcha(config.captchaUri);
	await getCooie("110371");
	let resp = await courseInfo.getMyCourse();
	console.log(resp);
}

getCourse();
