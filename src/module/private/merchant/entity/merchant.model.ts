import {Action} from "../../../../shared/utils/entity/utility.model";

export interface MerchantUI{
    id: string;
    index: number;
    name: string;
    email: string;
    type: string;
    spoc: string;
    action: Action[];
    active?: boolean;
    colorCode: string;
    blocked: boolean;
    officeList: OfficeListUI[];
}

export interface OfficeListUI{
    id: string;
    name: string;
}

export interface MerchantInformationUI{
    id?: string;
    index?: number;
    name: string;
    email: string;
    office: string[];
    timetable: TimeTableUI[];
    employeeList: EmployeeListUI[];
    colorCode: string;
    uPoint: string;
    tokiSpoc: string;
}

export interface MerchantInformationTableUI{
    index?: number;
    name: string;
    value: any;
}

export interface TimeTableUI {
     name: string;
     startDate: string;
     endDate: string;
     active: boolean
}

export interface EmployeeListUI {
    id: string;
    name: string;
    type: string[];
    phoneNumber: number;
    email: string;
    action?: Action[];
    dataApproved?: boolean
}

export interface MerchantMenuUI {
    id: string
    index?: number;
    photo: string;
    category: string;
    name: string;
    price: PriceUI[];
    inventory: InventoryUI[];
}

export interface PriceUI {
    name: string;
    price: number
}

export interface InventoryUI {
    name: string;
    inventory: number;
}

export interface TimeTableDto {
    index?: number;
    closed?: boolean;
    day: number;
    start_hour: string;
    end_hour: string;
    actions?: Action[];
}
