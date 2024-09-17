import {
	Checkbox,
	Form,
	FormInstance,
	Modal,
	notification,
	Select,
} from "antd";
import React, { useEffect, useState } from "react";
import {
	OrderByProductUI,
	OrderCancel,
	OrderCancelUI,
	Product,
} from "../entity/dashboard.entity";
import CustomSelect from "./CustomSelect";
import axios from "axios";
import { config } from "../../../../configs/constants";
import { validators } from "../validations";
import authHeader from "../../../public/auth/services/auth-header";

const { Option } = Select;
const API_URL = config.BASE_URL;

export interface OrderProductsProps {
	value?: Product[];
	onChange?: (products?: Product[]) => void;
}

export const cancelOptions = [
	{ key: "insufficient", text: "Ran out" },
	{ key: "out_of_menu", text: "No longer serving" },
];

export function OrderProducts(props: OrderProductsProps) {
	const [products, setProducts] = useState(props.value);

	const onChange = (product: Product, checked: boolean) => {
		let _products = products?.map((x) => {
			if (x.variant_id === product.variant_id) {
				x.isChecked = checked;
			}

			return x;
		});
		setProducts(_products);
		props.onChange && props.onChange(_products);
	};

	useEffect(() => {
		setProducts(props.value);
	}, [props.value]);

	return (
		<div className="form-group">
			{products?.map((product) => (
				<div>
					<Checkbox
						value={product.isChecked}
						className="form-check"
						onChange={(e) => onChange(product, e.target.checked)}
					/>
					<label className="col-form-label text-left ml-2">
						{product.product_name}(
						{product.options.map((opt) => opt.name).join("/")})
					</label>
				</div>
			))}
		</div>
	);
}

export interface EditOrderProps {
	form: FormInstance;
	order: OrderByProductUI;
	onReload: () => void;
}

const apiCancelOrder = (orderCancelUI: OrderCancelUI) => {
	let orderCancel: OrderCancel = {
		order_id: orderCancelUI.order_id,
		variant_ids: orderCancelUI.variants?.map((x) => x.variant_id),
		cancel_reason:
			cancelOptions.find((x) => x.key === orderCancelUI.cancel_reason_key)
				?.text ?? "",
	};

	return axios.post(API_URL + "admin/order/cancel", orderCancel, {
		headers: authHeader(),
	});
};

export default function EditOrder(props: EditOrderProps) {
	const onFinish = (values: OrderCancelUI) => {
		values.order_id = props.order.orderObject._id;
		values.variants = values.variants?.filter((x) => x.isChecked === true);
		apiCancelOrder(values).then(() => {
			notification.success({
				message: "Successful",
				description: "Order edit successful.",
			});

			props.onReload();

			Modal.destroyAll();
		});
	};

	useEffect(() => {
		props.form.setFieldsValue({
			variants: props.order.orderObject.items.filter(
				(x) => x.is_cancelled === false
			),
		});
	}, [props.order.orderObject]);

	return (
		<>
			{
				<Form className="form-horizontal" onFinish={onFinish} form={props.form}>
					<div className="form-group">
						<label className="col-form-label text-left">
							<strong>Product to edit</strong>
						</label>
						<Form.Item name="variants" rules={validators.CANCEL_PRODUCT}>
							<OrderProducts />
						</Form.Item>
					</div>
					<div className="form-group">
						<label className="col-form-label text-left">
							<strong>Edit notes</strong>
						</label>
						<Form.Item
							className="w-100"
							name="cancel_reason_key"
							rules={validators.CANCEL_REASON}
						>
							<CustomSelect
								className="text-left w-100"
								placeholder="Choose reason"
							>
								{cancelOptions.map((x) => (
									<Option value={x.key}>{x.text}</Option>
								))}
							</CustomSelect>
						</Form.Item>
					</div>
				</Form>
			}
		</>
	);
}
