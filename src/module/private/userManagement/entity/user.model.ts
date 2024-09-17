import {Action} from "../../../../shared/utils/entity/utility.model";

export interface UserUI {
    id: string;
    index?: number;
    name: string;
    email: string;
    role: string;
    actions?: Action[];
}

export interface AccessType {
    serviceType: string;
    merchant: string;
    dataReport: string;
    recommendation: string;
    office: string;
    configure: string;
    report: string;
    userManagement: string;
}

export interface AdminLogUI {
    name: string;
    email: string;
    date: string;
    action: string;
}