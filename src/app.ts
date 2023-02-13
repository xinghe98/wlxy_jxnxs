import { login } from "./login/login";
import courseInfo from "./course/courseInfo";

async function getCourse() {
	await login("110326");
	let res = await courseInfo.getMyCourse();
	console.log(res);
}

getCourse();
