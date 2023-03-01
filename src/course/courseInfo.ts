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
	private timestamp = new Date().getTime();
	/**GetMyCourse 访问 http://wlxy.jxnxs.com/app/course/getMyCourse 获取未学课程列表*/
	async getMyCourse(): Promise<number[]> {
		const resp = await requests.post(
			config.getMyCourseUri,
			{
				pageNo: "1",
				pageSize: "50",
				appStatus: "I",
				pdate: this.timestamp.toString(),
			},
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
				},
			},
		);
		let ItemId_list: number[] = [];
		const data = resp.data["rows"];
		for (let i = 0; i < data.length; i++) {
			ItemId_list.push(data[i]["item"]["itm_id"]);
		}
		return ItemId_list;
	}
	async GetCourseDetail(
		itemId: number,
	): Promise<{ resId: number; tkhId: number; studentId: number; coscontent: number }> {
		const uri =
			"http://wlxy.jxnxs.com/app/course/detailJson/" +
			itemId +
			"?pdate=" +
			this.timestamp.toString();
		const response = await (await requests.get(uri)).data;
		let resId: number = response["resId"];
		let tkhId: number = response["app"]["app_tkh_id"];
		let studentId: number = response["userEntId"];
		let coscontent: number = response["coscontent"];
		return { resId, tkhId, studentId, coscontent };
	}
}

export default new CourseInfo();
