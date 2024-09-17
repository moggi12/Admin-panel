import axios from "axios";
import authHeader from "../../../public/auth/services/auth-header";
import { logout } from "../../../public/auth/services/auth.service";
import {config} from "../../../../configs/constants";
const API_URL = config.BASE_URL;

export const getRoles = () => {
    return axios.get(API_URL + "admin/role", { headers: authHeader() });
};

export const addRoles = (name: string, scopes: any) => {
    return axios.post(API_URL + "admin/role", {name, scopes},{ headers: authHeader() });
};

export const editRoles = (name: string, scopes: any, id:string) => {
    return axios.post(API_URL + "admin/role/" + id, {name, scopes},{ headers: authHeader() });
};

export const deleteRole = (id:string) => {
    return axios.delete(API_URL + "admin/role/" + id,{ headers: authHeader() });
};
