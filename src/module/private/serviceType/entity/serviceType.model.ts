import {Action} from "../../../../shared/utils/entity/utility.model";

export interface ServiceTypeUI {
    id: string;
    index?: number,
    name: string
}

export interface ServiceTypeCategoriesUI {
    id: string,
    index?: number,
    category: string,
    image: string,
    options: ApplicableOptionsUI[],
    action?: Action[]
}

export interface ApplicableOptionsUI {
    _id: string;
    name: string;
    value_type: string;
    value: string;
}

export interface ServiceTypeOptionsUI {
    id: string,
    index?: number,
    option: string,
    type: string,
    value: string,
    action?: Action[]
}

export interface EstimateVariablesUI {
    id: string,
    category: string,
    estimates: string,
    deliveryEstimate: string,
    action?: Action[]
}

export interface ConfigurationsUI {
    key?: number,
    id: string,
    factor: string,
    measurement: string,
    measurementType: string,
    action?: Action[]
    isDelivery?: boolean
}

export interface TableUI{
    id: string;
    key: string;
    index?: number;
    name: string;
    isShow: boolean;
    action?: Action[]
}