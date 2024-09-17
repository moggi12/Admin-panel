import axios from "axios";
import authHeader from "../../../public/auth/services/auth-header";
import {PaginationUI} from "../../../../shared/utils/entity/utility.model";
import {config} from "../../../../configs/constants";
const API_URL = config.BASE_URL;

export const addUser = (name: string, email: string, role: string) => {
    return axios.post(API_URL + "admin/user",{name, email, role}, { headers: authHeader() });
};

export const getUser = () => {
    return axios.get(API_URL + "admin/user",{ headers: authHeader() });
};

export const editUser = (name: string, email: string, role: string, id: string) => {
    return axios.post(API_URL + "admin/user/" + id,{name, email, role}, { headers: authHeader() });
};

export const deleteUser = (id: string) => {
    return axios.delete(API_URL + "admin/user/" + id,{ headers: authHeader() });
};

export const getAdminLogs = (pagination: PaginationUI | undefined) => {
    return axios.get(API_URL + "admin/log",{ headers: authHeader(), params: pagination });
};