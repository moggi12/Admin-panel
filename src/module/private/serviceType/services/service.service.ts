import axios from "axios";
import authHeader from "../../../public/auth/services/auth-header";
import {config} from "../../../../configs/constants";
const API_URL = `${config.BASE_URL}admin/`;

export const getServiceTypes = () => {
    return axios.get(API_URL + "service", { headers: authHeader() });
};

export const getCategories = () => {
    return axios.get(API_URL + "category", { headers: authHeader() });
};

export const getCategoriesByMerchant = (merchantId: string) => {
    return axios.get(API_URL + `category/merchant/${merchantId}`, { headers: authHeader() });
};

export const editCategoryEstimate = (value: any, deliveryValue: any, id: any) => {
    return axios.post(API_URL + "category/" + id, { minutes_to_prepare: value, minutes_to_deliver: deliveryValue },  {headers: authHeader() });
};

export const editCategoryEstimateByMerchant = (value: any, deliveryValue: any, id: any, merchantId: any) => {
    return axios.post(API_URL + "category/" + id + `/merchant/${merchantId}`, { minutes_to_prepare: value, minutes_to_deliver: deliveryValue },  {headers: authHeader() });
};

export const getOptions = () => {
    return axios.get(API_URL + "option", { headers: authHeader() });
};

export const addOptions = (name: any, value_type: any, value: any) => {
    return axios.post(API_URL + "option", {name, value_type, value}, { headers: authHeader() });
};

export const editOptions = (name: any, value_type: any, value: any, id: string) => {
    return axios.post(API_URL + "option/" + id, {name, value_type, value}, { headers: authHeader() });
};

export const addCategory = (name: any, logo: any, applicable_options: any) => {
    return axios.post(API_URL + "category", { name, logo, applicable_options },  {headers: authHeader() });
};

export const editCategory = (name: any, logo: any, applicable_options: any, id: string) => {
    return axios.post(API_URL + "category/" + id, { name, logo, applicable_options },  {headers: authHeader() });
};

export const deleteCategory = (id: string) => {
    return axios.delete(API_URL + "category/" + id, {headers: authHeader() });
};

export const deleteOption = (id: string) => {
    return axios.delete(API_URL + "option/" + id, {headers: authHeader() });
};

export const getConfig = () => {
    return axios.get(API_URL + "config", { headers: authHeader() });
};

export const getConfigMerchant = (merchantId: string) => {
    return axios.get(API_URL + `config/merchant/${merchantId}`, { headers: authHeader() });
};

export const editConfig = (id: string, value: number) => {
    return axios.post(API_URL + "config/" + id, {value},{ headers: authHeader() });
};

export const editConfigMerchant = (id: string, value: number, merchantId: string) => {
    return axios.post(API_URL + "config/" + id + `/merchant/${merchantId}`, {value},{ headers: authHeader() });
};

export const getTables = () => {
    return axios.get(API_URL + "table", { headers: authHeader() });
};

export const editTableName = (key:string, label: string, is_show: boolean) => {
    return axios.post(API_URL + "table",{key,label,is_show}, { headers: authHeader() });
};

export const tableHide = (key: string, label: string) => {
    return axios.post(API_URL + "table",{key, is_show: false, label}, { headers: authHeader() });
};

export const tableShow = (key: string, label: string) => {
    return axios.post(API_URL + "table",{key, is_show: true, label}, { headers: authHeader() });
};

export const getInstruction = (type: any) => {
    return axios.get(API_URL + `instruction/${type}`, {headers: authHeader() });
};

export const addInstruction = (question: any, answer: any, type: any) => {
    return axios.post(API_URL + "instruction", { question, answer, type },  {headers: authHeader() });
};

export const editInstruction = (question: any, answer: any, type: any, id: string) => {
    return axios.post(API_URL + "instruction/info/" + id, { question, answer, type },  {headers: authHeader() });
};

export const deleteInstruction = (id: string) => {
    return axios.delete(API_URL + "instruction/info/" + id, {headers: authHeader() });
};

export const updateMerchantDeliveryTimeTable = (id: any, cancel_delivery_timetable: any) => {
    return axios.post(API_URL + "merchant/" + id, {cancel_delivery_timetable},{headers: authHeader() });
};

export const updateMerchantTakeAwayTimeTable = (id: any, cancel_take_away_timetable: any) => {
    return axios.post(API_URL + "merchant/" + id, {cancel_take_away_timetable},{headers: authHeader() });
};
