/** course_id:resId (大节课程id)
student_id:userEntId (学员id)
lesson_id : mod_id (小节课程id)
lesson_location : 'default', (小节课程位置)
time : mod_required_time,
start_time : start_time,
tkh_id : tkh_id|app_tkh_id
cmt_lrn_pass_ind 判断课程是否完成 */

import requests from "../http/requests";
import config from "../settings/settings";

class CourseInfo {
	private course_id = "";
	private student_id = "";
	private lesson_id = "";
	private lesson_location = "default";
	private time = "";
	private start_time = "";
	private tkh_id = "";
	private cmt_lrn_pass_ind = "";
	/**GetMyCourse 访问 http://wlxy.jxnxs.com/app/course/getMyCourse 获取未学课程列表*/
	async getMyCourse(): Promise<string[]> {
		const timestamp = new Date().getTime();
		const resp = await requests.post(
			config.getMyCourseUri,
			{
				pageNo: "1",
				pageSize: "50",
				appStatus: "I",
				pdate: timestamp.toString(),
			},
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
				},
			},
		);
		const data = resp.data["rows"];
		return data;
	}
}

export default new CourseInfo();
