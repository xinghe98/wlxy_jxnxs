// Description: 项目用到的配置信息

interface IConfig {
	getMyCourseUri: string;
	captchaUri: string;
	loginUri: string;
	testUri: string;
}

const config: IConfig = {
	captchaUri: "http://wlxy.jxnxs.com/app/captcha/captcha",
	loginUri: "http://wlxy.jxnxs.com/app/user/single/userlogin/login",
	testUri: "http://wlxy.jxnxs.com/app/home",
	getMyCourseUri: "http://wlxy.jxnxs.com/app/course/getMyCourse",
};

export default config;
