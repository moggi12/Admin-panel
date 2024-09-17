import axios from "axios";
import authHeader from "../../../public/auth/services/auth-header";
import {config} from "../../../../configs/constants";
const API_URL = `${config.BASE_URL}admin/`;

export const getOffices = () => {
    return axios.get(API_URL + "office", { headers: authHeader() });
};

export const addOffice = (data: any, image: string, pin_icon?: string) => {
    console.log(pin_icon)
    if (pin_icon === undefined){
        return axios.post(API_URL + "office", { name: data.name, number_of_storey: data.floors, logo: image, location: {lat: data.latitude, lon: data.longitude}, is_arena: data.is_arena}, { headers: authHeader() });
    } else {
        return axios.post(API_URL + "office", { name: data.name, number_of_storey: data.floors, logo: image, location: {lat: data.latitude, lon: data.longitude}, pin_icon: pin_icon, is_arena: data.is_arena}, { headers: authHeader() });
    }
};

export const editOffice = (data: any, id: string | undefined, image: string | undefined, pin_icon: string | undefined) => {
    console.log(data)
    return axios.post(API_URL + "office/" + id, { name: data.name, number_of_storey: data.floors, logo: image, location: {lat: data.latitude, lon: data.longitude}, pin_icon: pin_icon, is_arena: data.is_arena}, { headers: authHeader() });
};

export const deleteOffice = (id: string) => {
    return axios.delete(API_URL + "office/" + id, { headers: authHeader() });
};

export const deleteOfficeMerchant = (id: string, merchantId: string) => {
    return axios.delete(API_URL + "office/" + id + "/merchant/" + merchantId, { headers: authHeader() });
};
