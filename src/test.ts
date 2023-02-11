import axios from "axios";
import captchaOcr from "./login/captchaOcr";
import config from "./settings/settings";

axios.get(config.captchaUri).then(async (response) => {});
