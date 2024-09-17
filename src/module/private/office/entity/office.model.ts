import {Action} from "../../../../shared/utils/entity/utility.model";

export interface OfficeUI{
    id: string;
    index?: number;
    name: string ;
    location: LocationUI;
    merchant?: MerchantUI[];
    action: Action[];
    floors: number;
    image: string;
    pin_icon: string;
    is_arena: boolean
}

export interface MerchantUI{
    id: string;
    officeId: string;
    index?: number;
    name: string;
    logo: string;
    action?: Action[];
}

export interface LocationUI{
    longitude: number;
    latitude: number;
}