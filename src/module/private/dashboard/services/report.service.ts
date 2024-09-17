import axios from "axios";
import authHeader from "../../../public/auth/services/auth-header";
import {config} from "../../../../configs/constants";
const API_URL = config.BASE_URL;

export const getDashboard = () => {
    return axios.get(API_URL + "admin/dashboard", { headers: authHeader() });
};
