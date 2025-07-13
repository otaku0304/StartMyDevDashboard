import { Appconfig } from "../core/config/app.config";
import axiosInstance from "../core/tokenInterceptor/AxiosInstance";

export default class ScriptGeneratorService {
  constructor() {
    this.updateAddressSubject = [];
    this.Api = Appconfig.getAPIURI();
  }

  scriptGenerate(vehicleDetailsDTO) {
    const body = JSON.stringify(vehicleDetailsDTO);
    console.log(body);
    return axiosInstance.post(this.Api + "generate", body);
  }
}
