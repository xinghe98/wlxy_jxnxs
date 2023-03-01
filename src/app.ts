import { login } from "./login/login";
import courseInfo from "./course/courseInfo";

async function getCourse() {
	await login("110326");
	let res = await courseInfo.getMyCourse();
	for (let i = 0; i < res.length; i++) {
		let obj = await courseInfo.GetCourseDetail(res[i]);
		console.log(obj.resId);
	}
}

getCourse();
