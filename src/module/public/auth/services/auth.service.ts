import axios from "axios";
import authHeader from "./auth-header";
import jwtDecode from "jwt-decode";
import {config} from '../../../../configs/constants'
const API_URL = `${config.BASE_URL}auth/`;
const BASE_URL = config.BASE_URL;



export interface JWT {
    iat: number;
    exp: number;
    sub: string;
}

export const checkPassword = (password: string) => {
    return axios.post(BASE_URL + "auth/check-password", {
        password,
    }, { headers: authHeader() });
};

export const login = (email: string, password: string) => {
    return axios
        .post(BASE_URL + "auth/login", {
            email,
            password,
        })
        .then((response) => {
            if (response.data.status_code === 0) {
                let roleInfo = response.data.data.role
                localStorage.setItem("roleInfo", JSON.stringify(roleInfo));
                localStorage.setItem("user", JSON.stringify(response.data.data));
            }
            return response.data;
        });
};


export const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userRoles");
    localStorage.removeItem("roleInfo");
    document.location.href='/auth/login'
};

export const getRoles = async () => {
    const userData = getRoleInfo();
    return await axios
        .get(BASE_URL + "admin/role/" + userData._id, { headers: authHeader() })
}

export const getCurrentUser = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);
    return null;
};

export const getRoleInfo = () => {
    const userStr = localStorage.getItem("roleInfo");
    if (userStr) return JSON.parse(userStr);
    return null;
};

export const getUserRoles = () => {
    const userStr = localStorage.getItem("userRoles");
    if (userStr) return JSON.parse(userStr);
    return null;
};

export const authenticationCheck = () => {
    const userStr = localStorage.getItem("user");
    try {
        const user = JSON.parse(userStr? userStr : "");
        if (user) {
            const decodedJwt = jwtDecode<JWT>(user.access_token);
            if (decodedJwt.exp * 1000 < Date.now()) {
                localStorage.removeItem("user");
                localStorage.removeItem("userRoles");
                localStorage.removeItem("roleInfo");
                return false
            }
        }
    } catch (e) {
        localStorage.removeItem("user");
        localStorage.removeItem("userRoles");
        localStorage.removeItem("roleInfo");
        return false
    }
    return !!userStr;
};

export const recover = (email: string) => {
    return axios.post(API_URL + "recover", {email});
};

export const newPassword = (token: string, new_password: string) => {
    return axios.post(API_URL + "reset-password", {token, new_password});
};