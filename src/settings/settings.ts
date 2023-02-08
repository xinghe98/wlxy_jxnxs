// Description: 项目用到的配置信息

interface IConfig {
	captchaUri: string;
	loginUri: string;
}

const config: IConfig = {
	captchaUri: "http://wlxy.jxnxs.com/app/captcha/captcha",
	loginUri: "http://wlxy.jxnxs.com/app/user/single/userlogin/login",
};

export default config;
