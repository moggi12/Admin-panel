import axios from "axios";
import authHeader from "../../../public/auth/services/auth-header";
import {PaginationUI} from "../../../../shared/utils/entity/utility.model";
import {config} from "../../../../configs/constants";
const API_URL = config.BASE_URL;

export const getReview = (pagination: PaginationUI | undefined, searchText: any) => {
    if (!pagination?.search) {
        delete pagination?.search;
    }
    if (!pagination?.sort_by) {
        delete pagination?.sort_by;
    }
    if (!pagination?.sort_type) {
        delete pagination?.sort_type;
    }
    if (!pagination?.start_date) {
        delete pagination?.start_date;
    }
    if (!pagination?.end_date) {
        delete pagination?.end_date;
    }
    else if (searchText !== null) {
        let params = {
            ...pagination,
            search: searchText
        }
        return axios.get(API_URL + "admin/review", { headers: authHeader(), params: params });
    }
    return axios.get(API_URL + "admin/review", { headers: authHeader(), params: pagination });
};

export const getOrder = (pagination: PaginationUI | undefined, searchText: any) => {
    if (!pagination?.search) {
        delete pagination?.search;
    }
    if (!pagination?.sort_by) {
        delete pagination?.sort_by;
    }
    if (!pagination?.sort_type) {
        delete pagination?.sort_type;
    }
    else if (searchText !== null) {
        let params = {
            ...pagination,
            search: searchText,
        }
        return axios.get(API_URL + "admin/order", { headers: authHeader(), params: params });
    }
    let params = {
        ...pagination,
    }
    return axios.get(API_URL + "admin/order", { headers: authHeader(), params: params });
};

export const getReviewByDate = (pagination: PaginationUI | undefined, startDate: string, endDate: string) => {
    let params = {
        ...pagination,
        start_date: startDate,
        end_date: endDate
    }
    console.log(params)
    return axios.get(API_URL + "admin/review", { headers: authHeader(), params: params });
};

export const getOrderByDate = (pagination: PaginationUI | undefined, startDate: string, endDate: string) => {
    let params = {
        ...pagination,
        start_date: startDate,
        end_date: endDate
    }
    return axios.get(API_URL + "admin/order", { headers: authHeader(), params: params });
};

export const reviewCompensate = (id: string) => {
    return axios.post(API_URL + "admin/review/" + id + "/compensate", {},{ headers: authHeader() });
};

export const downloadReview = () => {
    return axios.get(API_URL + "admin/review?download=yes", { headers: authHeader(), responseType: 'arraybuffer' });
};

export const registerToken = (token: string) => {
    return axios.post(API_URL + "/auth/set-fcm-token", { token },{ headers: authHeader() });
};

export const getOrderById = (id: string) => {
    return axios.get(API_URL + "admin/order/" + id, { headers: authHeader() });
};
