import axios from "axios";
import authHeader from "../../../public/auth/services/auth-header";
import {config} from "../../../../configs/constants";
const API_URL = `${config.BASE_URL}admin/`;

export const getMerchants = () => {
    return axios.get(API_URL + "merchant", { headers: authHeader() });
};

export const downloadMerchantReport = (id: string, startDate: string, endDate: string, type: string) => {
    return axios.get(API_URL + "merchant/" + id + "/report?type=" + type + "&start_date=" + startDate + "&end_date=" + endDate + "&download=yes", { headers: authHeader(), responseType: 'arraybuffer' });
};

export const downloadMerchants = () => {
    return axios.get(API_URL + "merchant?download=yes", { headers: authHeader(), responseType: 'arraybuffer' });
};

export const getMerchantsByDate = (startDate: string, endDate: string) => {
    return axios.get(API_URL + "merchant?start_date=" + startDate + "&end_date=" + endDate, { headers: authHeader() });
};

export const getMerchantInfo = (id: string) => {
    return axios.get(API_URL + "merchant/" + id, { headers: authHeader() });
};

export const updateMerchantInfo = (id: string, isDelivery: boolean) => {
    return axios.post(API_URL + "merchant/" + id, {is_delivery: isDelivery},{ headers: authHeader() });
};

export const getMerchantProducts = (id: string) => {
    return axios.get(API_URL + "merchant/" + id + "/product", { headers: authHeader() });
};

export const approveDataMerchantEmployee = (id: string, employee: string) => {
    return axios.get(API_URL + "merchant/" + id + "/employee/" + employee, { headers: authHeader() });
};

export const deleteMerchantEmployee = (id: string, employee: string) => {
    return axios.delete(API_URL + "merchant/" + id + "/employee/" + employee, { headers: authHeader() });
};

export const deleteMerchantProduct = (id: string | undefined, product: string) => {
    return axios.delete(API_URL + "merchant/" + id + "/product/" + product, { headers: authHeader() });
};

export const approveMerchant = (id: string) => {
    return axios.post(API_URL + "merchant/" + id + "/approve",{}, { headers: authHeader() });
};

export const declineMerchant = (id: string, cancel_reason: string) => {
    return axios.post(API_URL + "merchant/" + id + "/decline",{cancel_reason}, { headers: authHeader() });
};

export const blockMerchant = (id: string) => {
    return axios.post(API_URL + "merchant/" + id + "/block",{}, { headers: authHeader() });
};

export const unblockMerchant = (id: string) => {
    return axios.post(API_URL + "merchant/" + id + "/unblock",{}, { headers: authHeader() });
};

export const getBanner = (id: string) => {
    return axios.get(API_URL + "banner/" + id, { headers: authHeader() });
};

export const createBanner = (values: any, image: string ) => {
    return axios.post(API_URL + "banner/",{...values,image}, { headers: authHeader() });
};

export const editBanner = (id: string, values: any, image: string) => {
    return axios.post(API_URL + "banner/" + id, {...values,image},{ headers: authHeader() });
};

export const changeBusy = (id: string, status: boolean) => {
    return axios.post(API_URL + "merchant/" + id,{ is_busy: status }, { headers: authHeader() });
};

export const changeTempClosed = (id: string, status: boolean) => {
    return axios.post(API_URL + "merchant/" + id,{ temporary_closed: status}, { headers: authHeader() });
};
