export interface ReviewUI {
    id: string;
    index: number;
    order_id: string,
    order_no: string
    orderInfo: OrderInfoUI;
    merchant: string;
    office: string;
    merchantId: number;
    username: string;
    phoneNumber: number;
    review: number;
    comment: string;
    penalty: boolean;
    date: string;
    delivered_at: string;
    delivery_estimate: string;
}

export interface OrderInfoUI {
    id: string;
    order_no: string;
    status: string;
    date: string;
    items: ProductsUI[]
}

export interface ProductsUI {
    product: ProductUI;
    qty: number;
    price: number;
    options: ProductOptionsUI[],
}

export interface ProductUI {
    name: string;
}

export interface OrderInfoTableUI {
    id: string;
    status: string;
    date: string;
    product: string;
    amount: number;
    options: ProductOptionsUI[],
}

export interface ProductOptionsUI {
    option: string;
    value: string;
}
