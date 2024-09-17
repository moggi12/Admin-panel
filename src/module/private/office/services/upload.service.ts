import axios from "axios";
import {authHeaderFormData} from "../../../public/auth/services/auth-header";
import {config} from "../../../../configs/constants";
const API_URL = config.BASE_URL;

export const uploadImage = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return axios.post(API_URL + "upload", formData, { headers: authHeaderFormData() });
};