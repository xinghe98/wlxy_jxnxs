import axios from "axios";
import { conf } from "../conf/config";

class CaptchaOcr {
	async getOcrResult(image: string): Promise<string | undefined> {
		const data = JSON.stringify({
			token: conf.Token,
			type: conf.type,
			image: image,
		});
		try {
			const resp = await axios.post("https://www.jfbym.com/api/YmServer/customApi", data, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			return resp.data.data.data;
		} catch (error) {
			console.log(error);
			return;
		}
	}
}

export default new CaptchaOcr();
