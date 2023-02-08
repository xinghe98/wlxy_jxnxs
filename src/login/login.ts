let readline = require("readline");
import axios from "axios";
import config from "../settings/settings";

// 用于终端输入交互
let rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// 用于终端输入交互
async function ques() {
	return new Promise(function (resolve) {
		//question提问事件
		rl.question("名字?\n", function (ans: string) {
			resolve(ans);
		});
		rl.on("close", function () {
			//结束readline进程
			process.exit(0);
		});
	});
}

// 获取验证码并保存到本地，返回cookie(包含验证码的cookie)
async function getCaptcha(url: string): Promise<string> {
	let resp = await axios.get(url, {
		responseType: "arraybuffer",
	});
	const fs = require("fs");
	fs.writeFileSync("captcha.png", resp.data);
	if (resp.headers["set-cookie"]) {
		return resp.headers["set-cookie"].join(";");
	} else {
		return "";
	}
}

/* 登录，返回cookie（包含登录信息的cookie）
@param username 用户名
@param password 密码(默认为"/DFGws7yGmJIUmbuYMU+Mg==")
@param captcha 验证码 */
async function getCooie(
	username: string,
	password: string = "/DFGws7yGmJIUmbuYMU+Mg==",
): Promise<string> {
	let cookie = await getCaptcha(config.captchaUri);
	let captcha = await ques();
	let resp = await axios.post(
		config.loginUri,
		{
			usrSteUsrId: username,
			userPassword: password,
			usrCode: captcha,
		},
		{
			headers: {
				"Content-Type": "application/json",
				Cookie: cookie,
			},
		},
	);
	console.log(resp.data);
	if (resp.data["code"] == "200" && resp["headers"]["set-cookie"]) {
		return resp["headers"]["set-cookie"].join(";");
	} else {
		throw new Error("登录失败" + resp.data["msg"]);
	}
}

export { getCooie };
