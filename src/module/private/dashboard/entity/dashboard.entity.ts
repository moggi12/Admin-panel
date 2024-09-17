export interface OrderTableProps {
    orders: Order[];
    orderFilter: OrderFilter;
    onReload: () => void;
    merchantId: string
}

export interface Action {
    icon: string;
    text?: string;
    type: ActionType;
    color?: string;
    element?: any;
}

export enum ActionType {
    add,
    edit,
    delete,
    hide,
    next,
    show,
}

export interface Option {
    _id: string;
    option: string;
    value: string;
    name: string;
    action?: Action[];
}


export interface OrderByProductUI {
    orderIndex: number;
    index: number;
    order_no?: string;
    id: string;
    product_name: string;
    qty: number;
    state: string;
    operation?: Action[];
    delivery_estimate: Date;
    delivery_floor: number;
    delivery_seat: string;
    delivery_row: string;
    delivery_location: string;
    delivery_address: string;
    delivery_zone: string;
    phone_no: string;
    delivery_instruction: string;
    company_reg_number: string;
    ebarimt_type: string;
    delivered_by: string;
    review_star?: string;
    review_comment?: string;
    review_type: string;
    penalty?: number;
    is_cancelled: boolean;
    delivered_at: Date;
    options: Option[];
    orderObject: Order;
    office_name: string;
    product_price: number;
    promotion_price: number;
    estimate_minutes: any;
    penalty_merchant: any;
    penalty_delivery: any
}

export interface Product {
    product_id: string;
    product_name: string;
    options: Option[];
    category_id: string;
    product_price: number;
    promotion_price: number;
    category_name: string;
    qty: number;
    is_cancelled: boolean;
    variant_id: string;
    isChecked: boolean;
}

export interface State {
    prev_state: string;
    new_state: string;
    dt: Date;
    channel: string;
    _id: string;
}

export interface Order {
    _id: string;
    order_no: string;
    customer: string;
    merchant: string;
    state: string;
    total_qty: number;
    items: Product[];
    is_reviewed: boolean;
    penalty: number;
    states: State[];
    total: number;
    presale_total: number;
    created_at: Date;
    updated_at: Date;
    delivery_estimate: Date;
    delivery_address: string;
    delivery_floor: number;
    delivery_location: string;
    delivery_zone: string;
    delivery_seat: string;
    delivery_row: string;
    delivery_instruction: string;
    ebarimt_type: string;
    order_type: string;
    paid_at: Date;
    phone_no: string;
    delivered_by: string;
    review_star: string;
    review_comment: string;
    review_type: string;
    delivered_at: Date;
    company_reg_number: string;
    office_name: string;
    estimate_minutes: any;
    penalty_merchant: any;
    penalty_delivery: any;
}

export interface OrderFilter {
    status?: string;
    page: number;
    page_size: number;
    sort: string;
    order_type?: string;
    search?: string;
}

export interface SelectStatusProps {
    statusKey: string;
}

export interface TokiPagination<T> {
    items: T[];
    pagination?: PaginationModel;
}

export interface PaginationModel {
    page: number;
    page_size: number;
    total_count: number;
    item_count: number;
}

export interface TokiColumn {
    key: string;
    label: string;
    is_show: boolean;
    _id?: string;
}

export interface TokiTable {
    type?: string;
    report_type: string;
    merchant?: string;
    columns: TokiColumn[];
    _id?: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface OrderCancel {
    order_id: string;
    cancel_reason: string;
    variant_ids?: string[];
}

export interface OrderCancelUI extends OrderCancel {
    variants?: Product[];
    cancel_reason_key: string;
}
