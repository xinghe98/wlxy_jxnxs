let readline = require("readline");
import config from "../settings/settings";
import requests from "../http/requests";

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

/** 获取验证码并保存到本地，返回cookie(包含验证码的cookie) */
async function getCaptcha(url: string) {
	let resp = await requests.get(url, {
		responseType: "arraybuffer",
	});
	const fs = require("fs");
	fs.writeFileSync("captcha.png", resp.data);
}

/** 登录，返回cookie（包含登录信息的cookie）
@param username 用户名
@param password 密码(默认为"/DFGws7yGmJIUmbuYMU+Mg==")
@param captcha 验证码 */
async function getCooie(username: string, password: string = "/DFGws7yGmJIUmbuYMU+Mg==") {
	let captcha = await ques();
	let resp = await requests.post(
		config.loginUri,
		{
			usrSteUsrId: username,
			userPassword: password,
			usrCode: captcha,
		},
		{
			headers: {
				"Content-Type": "application/json",
			},
		},
	);
	if (resp.data["code"] != 200) {
		console.log(resp.data["msg"]);
		throw new Error("登录失败");
	}

	console.log(resp.data);
}

export { getCaptcha, getCooie };
