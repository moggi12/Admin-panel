import { Rule } from "antd/lib/form";

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

export declare namespace ManageProduct {
    export interface ApplicableOption {
        option: string;
        applicable_choices: string[];
    }

    export interface Option {
        option: string;
        value: string;
    }

    export interface Variant {
        price: number;
        stock: number;
        options: Option[];
    }

    export interface Product {
        _id: string;
        name: string;
        image: string;
        category?: string;
        refresh_stock?: string;
        is_active?: boolean;
        applicable_options: ApplicableOption[];
        variants: Variant[];
    }

    export interface ProductUI extends Product {
        imageFile?: File;
    }
}


const PASSWORD: Rule[] = [
    {
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.{8,})/,
        message: "Том, жижиг үсэг орсон 8-с дээш оронтой нууц үг байх ёстой.",
    },
];

const ENTER_PASSWORD: Rule[] = [
    {
        required: true,
        message: "Нууц үгээ оруулна уу.",
    },
];

const PHYSICAL_OFFICE_REQUIRED: Rule[] = [
    {
        required: true,
        message: "Өөрийн оффисыг сонгоно уу.",
    },
];

const FLOOR_REQUIRED: Rule[] = [
    {
        required: true,
        message: "Давхарыг сонгоно уу.",
    },
];

const LOGO_REQUIRED: Rule[] = [
    {
        required: true,
        message: "Логог оруулна уу.",
    },
];

const UPOINT_TOKEN_REQUIRED: Rule[] = [
    {
        required: true,
        message: "U-Point токенийг оруулна уу.",
    },
];

const TOKI_MERCHANT_ID_REQUIRED: Rule[] = [
    {
        required: true,
        message: "Токи мерчант ID оруулна уу.",
    },
];

const ENTER_EMPLOYEE_NAME: Rule[] = [
    {
        required: true,
        message: "Ажилтны нэр оруулна уу.",
    },
];

const ENTER_PRODUCT_NAME: Rule[] = [
    {
        required: true,
        message: "Бүтээгдэхүүний нэр оруулна уу",
    },
];

const ENTER_PHONE_NUMBER: Rule[] = [
    {
        required: true,
        message: "Утасны дугаар оруулна уу.",
    },
    {
        pattern: /^\d+$/,
        message: "8-н оронтой тоо оруулна уу.",
    },
];

const CANCEL_REASON: Rule[] = [
    {
        required: true,
        message: "Цуцлах шалтгааныг оруулна уу.",
    },
];

const PRODUCT_CATEGORY_REQUIRED: Rule[] = [
    {
        required: true,
        message: "Бүтээгдэхүүний төрлийг сонгоно уу",
    },
];

const PROMOTION_SALE_PERCENT_REQUIRED: Rule[] = [
    {
        required: true,
        message: "Урамшууллын хувийг оруулна уу",
    },
];

const PROMOTION_PRODUCT_TYPE_REQUIRED: Rule[] = [
    {
        required: true,
        message: "Бүтээгдэхүүн сонгоно уу",
    },
];

const IMAGE_REQUIRED: Rule[] = [
    {
        required: true,
        message: "Зургийг оруулна уу.",
    },
];

const PROMOTION_START_DATE_REQUIRED: Rule[] = [
    {
        required: true,
        message: "Урамшууллын эхлэх хугацааг оруулна уу",
    },
];

const PROMOTION_END_DATE_REQUIRED: Rule[] = [
    {
        required: true,
        message: "Урамшууллын дуусах хугацааг оруулна уу",
    },
];

const CANCEL_PRODUCT: Rule[] = [
    () => ({
        validator(_, value: Product[]) {
            if (value.filter((x) => x.isChecked === true).length === 0) {
                return Promise.reject(
                    new Error("Цуцлах бүтээгдэхүүнүүдийг сонгоно уу.")
                );
            }

            return Promise.resolve();
        },
    }),
];

const VARIANTS_REASON: Rule[] = [
    {
        required: true,
        message: "Цуцлах бүтээгдэхүүнийг сонгоно уу.",
    },
];

const ENTER_EMAIL: Rule[] = [
    {
        required: true,
        message: "Имэйл хаягаа оруулна уу.",
    },
    {
        type: "email",
        message: "Имэйл хаяг буруу байна.",
    },
];

const ENTER_CORPORATE_NAME: Rule[] = [
    {
        required: true,
        message: "Бизнесийн нэрээ оруулна уу.",
    },
];

const ENTER_COLOR: Rule[] = [
    {
        required: true,
        message: "Бренд өнгөний кодоо оруулна уу.",
    },
];

const COLOR: Rule[] = [
    {
        pattern: /^#[0-9A-F]{6}$/i,
        message: "#-р эхэлсэн 6 оронтой HEX код оруулах ёстой.",
    },
];

const TOKI_SPOC: Rule[] = [
    {
        pattern: /^[-А-Яа-я.ӨөҮү]+$/,
        message: "Зөвхөн кирилл үсэг оруулна уу.",
    },
];

const BAR_CODE: Rule[] = [
    {
        pattern: /^[\wZ0-9_]+$/,
        message: "Зөвхөн кирилл үсэг, тоо, доогуур зураас оруулна уу.",
    },
];

const ARE_PASSWORDS_SAME: Rule[] = [
    ({ getFieldValue }) => ({
        validator(_, value) {
            if (
                !value ||
                getFieldValue("password") === value ||
                getFieldValue("new_password") === value
            ) {
                return Promise.resolve();
            }
            return Promise.reject(new Error("Нууц үг таарахгүй байна!"));
        },
    }),
];

const VARIANTS: Rule[] = [
    () => ({
        validator(_, value: ManageProduct.Variant[]) {
            for (const element of value) {
                if (element.price === 0) {
                    return Promise.reject("Бүтээгдэхүүний үнэ 0 - ээс их байх ёстой.");
                }
            }

            return Promise.resolve();
        },
    }),
];

export const validators = {
    PASSWORD,
    ENTER_PASSWORD,
    PHYSICAL_OFFICE_REQUIRED,
    ENTER_EMAIL,
    ENTER_CORPORATE_NAME,
    ENTER_COLOR,
    COLOR,
    TOKI_SPOC,
    ARE_PASSWORDS_SAME,
    ENTER_EMPLOYEE_NAME,
    ENTER_PHONE_NUMBER,
    ENTER_PRODUCT_NAME,
    CANCEL_REASON,
    VARIANTS_REASON,
    FLOOR_REQUIRED,
    LOGO_REQUIRED,
    IMAGE_REQUIRED,
    UPOINT_TOKEN_REQUIRED,
    TOKI_MERCHANT_ID_REQUIRED,
    CANCEL_PRODUCT,
    PRODUCT_CATEGORY_REQUIRED,
    PROMOTION_SALE_PERCENT_REQUIRED,
    PROMOTION_START_DATE_REQUIRED,
    PROMOTION_END_DATE_REQUIRED,
    PROMOTION_PRODUCT_TYPE_REQUIRED,
    VARIANTS,
    BAR_CODE
};
