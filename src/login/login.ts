import config from "../settings/settings";
import requests from "../http/requests";
import captchaOcr from "./captchaOcr";

/** 获取验证码并识别，直接返回验证码结果 */
async function getCaptcha(url: string) {
	let resp = await requests.get(url, {
		responseType: "arraybuffer",
	});
	let base64 = Buffer.from(resp.data, "binary").toString("base64");
	const result = await captchaOcr.getOcrResult(base64);
	return result;
}

/** 登录，返回cookie（包含登录信息的cookie）
@param username 用户名
@param password 密码(默认为"/DFGws7yGmJIUmbuYMU+Mg==")
@param captcha 验证码 */
async function login(username: string, password: string = "/DFGws7yGmJIUmbuYMU+Mg==") {
	let result = await getCaptcha(config.captchaUri);
	let resp = await requests.post(
		config.loginUri,
		{
			usrSteUsrId: username,
			userPassword: password,
			usrCode: result,
		},
		{
			headers: {
				"Content-Type": "application/json;charset=UTF-8",
				Accept: "application/json, text/plain, */*",
			},
		},
	);
	// console.log(resp.headers);
	if (resp.data["code"] != 200) {
		console.log(resp.data["msg"]);
		throw new Error("登录失败");
	}
}

export { getCaptcha, login };
