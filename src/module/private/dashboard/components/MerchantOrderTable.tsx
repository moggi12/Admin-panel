import { ReactNode, useEffect, useState } from "react";
import { config } from "../../../../configs/constants";
import axios from "axios";
import authHeader from "../../../public/auth/services/auth-header";
import { ColumnsType } from "antd/lib/table";
import {
	Action,
	ActionType,
	Option,
	Order,
	OrderByProductUI,
	OrderFilter,
	OrderTableProps,
	SelectStatusProps,
	TokiPagination,
	TokiTable,
} from "../entity/dashboard.entity";
import { Dropdown, Menu, Modal, notification } from "antd";
import { useForm } from "antd/lib/form/Form";
import { IOModal } from "../../../../shared/utils/Modal/Modal";
import EditOrder from "./EditOrder";
import { AlignType } from "rc-table/lib/interface";
import moment from "moment";
import Countdown, { zeroPad } from "react-countdown";
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner";
import CustomTable from "./CustomTable/CustomTable";

const API_URL = config.BASE_URL;

const apiChangeOrderStatus = (order_id: string) => {
	return axios.post(
		API_URL + "admin/order/change_state",
		{
			order_id,
		},
		{ headers: authHeader() }
	);
};

function formatCurrency(amount: number): string {
	return amount.toFixed(0).replace(/\d(?=(\d{3})+)/g, "$&'");
}

function apiGetTableOrder(): Promise<any> {
	return axios.get(API_URL + "admin/table/dashboard", {
		headers: authHeader(),
	});
}

export const ebarimtTypes = [
	{ key: "individual", label: "Иргэн" },
	{ key: "company", label: "Байгууллага" },
];

const getEbarimtType = (type: string) => {
	return ebarimtTypes.find((x) => x.key === type);
};

export const orderStatuses = [
	{ key: "paid", label: "New" },
	{ key: "preparing", label: "Preparing" },
	{ key: "prepared", label: "Prepared" },
	{ key: "delivering", label: "Delivering" },
	{ key: "completed", label: "Completed" },
	{ key: "cancelled", label: "Cancelled" },
];

const getStatus = (status: string) => {
	return orderStatuses.find((x) => x.key === status);
};

const OrderTable = (props: OrderTableProps) => {
	const [allColumns, setAllColumns] = useState<ColumnsType<OrderByProductUI>>(
		[]
	);
	const [loading, setLoading] = useState<boolean>(true);
	const [columns, setColumns] = useState<ColumnsType<OrderByProductUI>>([]);

	const SelectStatus = (_props: SelectStatusProps) => {
		let _status = getStatus(_props.statusKey);

		return (
			<Dropdown
				overlay={
					<Menu>
						{orderStatuses.map((x) => (
							<Menu.Item
								key={x.key}
								className={x.key === _props.statusKey ? "font-weight-bold" : ""}
							>
								{x.label}
							</Menu.Item>
						))}
					</Menu>
				}
			>
				<span>
					<span>{_status?.label} </span>
					<i
						className="toki-icon toki-icon-Down-arrow-7 ml-2"
						style={{ fontSize: "10px" }}
					/>
				</span>
			</Dropdown>
		);
	};

	useEffect(() => {
		if (allColumns) {
			setColumns(
				allColumns.filter(
					(x) =>
						x.key !== "review_star" &&
						x.key !== "review_comment" &&
						x.key !== "penalty" &&
						x.key !== "penalty_delivery" &&
						x.key !== "penalty_merchant" &&
						x.key !== "estimate_minutes" &&
						x.key !== "delivered_at"
				)
			);
		}
		setLoading(false);
	}, [props.orderFilter.status, allColumns]);

	const getExistingOptions = (): Option[] => {
		let _existingColumns: Option[] = [];

		props.orders.forEach((_order) =>
			_order.items.forEach((_item) => {
				_item.options.forEach((_option) => {
					if (!_existingColumns.find((x) => x.option === _option.option)) {
						_existingColumns.push(_option);
					}
				});
			})
		);

		return _existingColumns;
	};
	const filterColumns = (
		_columns: ColumnsType<OrderByProductUI>,
		table: TokiTable
	) => {
		_columns.forEach((_column) => {
			table?.columns.forEach((_col) => {
				if (_column.key === _col.key) {
					_column.title = _col.label;
				}
			});
		});

		_columns = _columns.filter((_column) => {
			let _col = table?.columns.find((x) => x.key === _column.key);
			return (
				_col?.is_show === true ||
				_column?.key?.toString().startsWith("toki-options-")
			);
		});

		return _columns;
	};

	const renderRowSpan = (component: ReactNode, index: number) => {
		const obj = {
			children: component,
			props: {
				rowSpan: 0,
			},
		};

		obj.props.rowSpan = getRowSpans(orderUIs, "order_no")[index];
		return obj;
	};

	const [editOrderForm] = useForm();

	const onActionClick = (order: OrderByProductUI, action: Action) => {
		switch (action.type) {
			case ActionType.delete:
				IOModal.showOnly({
					title: "Захиалга цуцлах",
					content: (
						<EditOrder
							order={order}
							form={editOrderForm}
							onReload={props.onReload}
						/>
					),
					okText: "Захиалга цуцлах",
					onOk: () => {
						editOrderForm.submit();
					},
					cancelText: "Буцах",
				});
				break;
			case ActionType.next:
				IOModal.showOnly({
					title: "Захиалгын төлвийг өөрчлөхдөө итгэлтэй байна уу?",
					okText: "Зөвшөөрөх",
					onOk: () => {
						Modal.destroyAll();
						setLoading(true);
						apiChangeOrderStatus(order.id).then(() => {
							props.onReload();
							setLoading(false);
							notification.success({
								message: "Амжилттай",
								description: "Захиалгын төлөв амжилттай өөрчлөгдлөө.",
							});
						});
					},
				});
				break;
			default:
				break;
		}
	};

	const getRowSpans = (data: any, key: any) => {
		let sameValueLength = 0;
		const rowSpans = [];
		for (let i = data.length - 1; i >= 0; i--) {
			if (i === 0) {
				rowSpans[i] = sameValueLength + 1;
				continue;
			}
			if (data[i][key] === data[i - 1][key]) {
				rowSpans[i] = 0;
				sameValueLength++;
			} else {
				rowSpans[i] = sameValueLength + 1;
				sameValueLength = 0;
			}
		}
		return rowSpans;
	};

	const [orderUIs, setOrderUIs] = useState<OrderByProductUI[]>([]);

	useEffect(() => {
		if (orderUIs) {
			setLoading(true);
			apiGetTableOrder().then((response) => {
				let table: TokiTable = response.data.data;
				let _existingOptions = getExistingOptions();

				let beginningColumns: ColumnsType<OrderByProductUI> = [
					{
						title: "№",
						dataIndex: "order_no",
						key: "order_no",
						align: "center" as AlignType,
						render: (
							value: string,
							_record: OrderByProductUI,
							index: number
						) => {
							return renderRowSpan(value, index);
						},
					},
					{
						title: "Бүтээгдэхүүн",
						dataIndex: "product_name",
						key: "product_name",
						align: "center" as AlignType,
						render: (productName: string, _record: OrderByProductUI) => {
							if (_record.is_cancelled) {
								return <del className="left-border">{productName}</del>;
							}
							return <span className="left-border">{productName}</span>;
						},
					},
				];

				let optionColumns = _existingOptions.map((option) => {
					return {
						title: option.name,
						dataIndex: "options",
						key: "toki-options-" + option._id,
						align: "center" as AlignType,
						render: (_value: Option[], _record: OrderByProductUI) => {
							let selectedOption = _value.find(
								(x) => x.option === option.option
							);

							if (_record.is_cancelled) {
								return (
									<del className="left-border">
										{selectedOption?.value ?? "-"}
									</del>
								);
							} else {
								return (
									<span className="left-border">
										{selectedOption?.value ?? "-"}
									</span>
								);
							}
						},
					};
				});

				let endingColumns: ColumnsType<OrderByProductUI> = [
					{
						title: "Тоо ширхэг",
						dataIndex: "qty",
						key: "qty",
						align: "center" as AlignType,
						render: (amount: number, _record: OrderByProductUI) => {
							if (_record.is_cancelled === true) {
								return <del className="left-border">{amount}</del>;
							}

							return <span className="left-border">{amount}</span>;
						},
					},
					{
						title: "Нэгжийн үнэ",
						dataIndex: "product_price",
						key: "product_price",
						align: "center" as AlignType,
						render: (amount: number, _record: OrderByProductUI) => {
							let priceWidget;

							if (_record.promotion_price !== undefined) {
								priceWidget = (
									<>
										<del>{formatCurrency(_record.product_price)}</del>
										<div>{formatCurrency(_record.promotion_price)}</div>
									</>
								);
							} else {
								priceWidget = formatCurrency(amount);
							}

							if (_record.is_cancelled === true) {
								return <del className="left-border">{priceWidget}</del>;
							}

							return <span className="left-border">{priceWidget}</span>;
						},
					},
					{
						title: "Захиалгын төлөв",
						dataIndex: "state",
						key: "state",
						width: "150px",
						align: "center" as AlignType,
						render: (
							value: string,
							_record: OrderByProductUI,
							index: number
						) => {
							return props.orderFilter.status == "completed"
								? renderRowSpan(getStatus(value)?.label, index)
								: renderRowSpan(<SelectStatus statusKey={value} />, index);
						},
					},
					{
						title: "Огноо",
						dataIndex: "delivered_at",
						key: "delivered_at",
						align: "center" as AlignType,
						render: (value: Date, _record: OrderByProductUI, index: number) => {
							return renderRowSpan(
								moment(value).format("YYYY.MM.DD hh:mm"),
								index
							);
						},
					},
					{
						title: "Үйлдэл",
						dataIndex: "operation",
						key: "operation",
						align: "center" as AlignType,
						width: 100,
						render: (
							actions: Action[],
							record: OrderByProductUI,
							index: number
						) => {
							// if (record.state !== "paid") {
							//     actions = actions.filter((x) => x.type !== ActionType.delete);
							// }

							return renderRowSpan(
								<div className="list-icons">
									{actions?.map((action) => (
										<a href="#" className="list-icons-item">
											<i
												className={action.icon}
												style={{ color: action.color ?? "text-primary-400" }}
												onClick={() => onActionClick(record, action)}
											/>
										</a>
									))}
								</div>,
								index
							);
						},
					},
					{
						title: "Биелэх хугацаа",
						dataIndex: "delivery_estimate",
						key: "delivery_estimate",
						align: "center" as AlignType,
						render: (value: Date, _record: OrderByProductUI, index: number) => {
							return renderRowSpan(
								<Countdown
									key={_record.id}
									overtime={true}
									date={value}
									renderer={({ days, hours, minutes, seconds, completed }) => {
										return (
											<span className={completed ? "text-danger" : ""}>
												{completed ? "-" : ""}
												{zeroPad(days * 24 + hours)}:{zeroPad(minutes)}:
												{zeroPad(seconds)}
											</span>
										);
									}}
								/>,
								index
							);
						},
					},
					{
						title: "Оффис, Давхар",
						dataIndex: "delivery_floor",
						key: "delivery_floor",
						align: "center" as AlignType,
						width: "250px",
						render: (
							_value: string,
							_record: OrderByProductUI,
							index: number
						) => {
							console.log(_record.delivery_row);
							let component = (
								<div>
									<div>{_record.office_name}</div>
									<div>{_record.delivery_floor} давхар</div>
								</div>
							);
							if (_record.delivery_location === "Тоглолтын заал") {
								component = (
									<div>
										<div>{_record.office_name}</div>
										<div>{_record.delivery_location}</div>
										<div>{_record.delivery_zone}</div>
										<div>{_record.delivery_row} эгнээ</div>
										<div>{_record.delivery_seat} суудал</div>
									</div>
								);
							} else if (_record.delivery_location === "Хананд авиралтын төв") {
								component = (
									<div>
										<div>{_record.office_name}</div>
										<div>{_record.delivery_location}</div>
									</div>
								);
							} else if (_record.delivery_location === "Хурлын өрөө") {
								component = (
									<div>
										<div>{_record.office_name}</div>
										<div>{_record.delivery_location}</div>
										<div>{_record.delivery_seat} өрөө</div>
									</div>
								);
							} else if (_record.delivery_location === "E-Sport төв") {
								component = (
									<div>
										<div>{_record.office_name}</div>
										<div>{_record.delivery_location}</div>
										<div>{_record.delivery_seat} суудал</div>
									</div>
								);
							} else if (_record.delivery_location === "Бусад") {
								component = (
									<div>
										<div>{_record.office_name}</div>
										<div>{_record.delivery_floor} давхар</div>
										<div>{_record.delivery_seat} дугаар</div>
									</div>
								);
							}
							return renderRowSpan(component, index);
						},
					},
					{
						title: "Organization",
						dataIndex: "delivery_address",
						key: "delivery_address",
						align: "center" as AlignType,
						render: (
							value: string,
							_record: OrderByProductUI,
							index: number
						) => {
							return renderRowSpan(value, index);
						},
					},
					{
						title: "Phone Number",
						dataIndex: "phone_no",
						key: "phone_no",
						align: "center" as AlignType,
						render: (
							value: string,
							_record: OrderByProductUI,
							index: number
						) => {
							return renderRowSpan(value, index);
						},
					},
					{
						title: "Delivery Instructions",
						dataIndex: "delivery_instruction",
						key: "delivery_instruction",
						align: "center" as AlignType,
						render: (
							value: string,
							_record: OrderByProductUI,
							index: number
						) => {
							return renderRowSpan(value, index);
						},
					},
					{
						title: "Ebarimt",
						dataIndex: "ebarimt_type",
						key: "ebarimt_type",
						align: "center" as AlignType,
						render: (
							value: string,
							_record: OrderByProductUI,
							index: number
						) => {
							let _value = getEbarimtType(value);
							return renderRowSpan(
								<div>
									<div>{_value?.label}</div>
									<div>{_record.company_reg_number}</div>
								</div>,
								index
							);
						},
					},
					{
						title: "Delivery By",
						dataIndex: "delivered_by",
						key: "delivered_by",
						align: "center" as AlignType,
						render: (
							value: string,
							_record: OrderByProductUI,
							index: number
						) => {
							return renderRowSpan(value, index);
						},
					},
					{
						title: <div className="mi-star-border" />,
						dataIndex: "review_star",
						key: "review_star",
						align: "center" as AlignType,
						render: (
							value: number,
							_record: OrderByProductUI,
							index: number
						) => {
							return renderRowSpan(value, index);
						},
					},
					{
						title: "Comment",
						dataIndex: "review_comment",
						key: "review_comment",
						align: "center" as AlignType,
						render: (
							value: number,
							_record: OrderByProductUI,
							index: number
						) => {
							return renderRowSpan(value, index);
						},
					},
					{
						title: "Review",
						dataIndex: "review_type",
						key: "review_type",
						align: "center" as AlignType,
						render: (
							value: number,
							_record: OrderByProductUI,
							index: number
						) => {
							return renderRowSpan(value, index);
						},
					},
					{
						title: "Penalty",
						dataIndex: "penalty",
						key: "penalty",
						align: "center" as AlignType,
						render: (
							value: number,
							_record: OrderByProductUI,
							index: number
						) => {
							return renderRowSpan(value, index);
						},
					},
					{
						title: "Merchant Penalty",
						dataIndex: "penalty_merchant",
						key: "penalty_merchant",
						align: "center" as AlignType,
						render: (
							value: number,
							_record: OrderByProductUI,
							index: number
						) => {
							return renderRowSpan(value, index);
						},
					},
					{
						title: "Delivery Penalty",
						dataIndex: "penalty_delivery",
						key: "penalty_delivery",
						align: "center" as AlignType,
						render: (
							value: number,
							_record: OrderByProductUI,
							index: number
						) => {
							return renderRowSpan(value, index);
						},
					},
					{
						title: "Esminated minutes",
						dataIndex: "estimate_minutes",
						key: "estimate_minutes",
						align: "center" as AlignType,
						render: (
							value: number,
							_record: OrderByProductUI,
							index: number
						) => {
							return renderRowSpan(value, index);
						},
					},
				];

				let _allColumns = filterColumns(
					beginningColumns.concat(optionColumns).concat(endingColumns),
					table
				);

				setAllColumns(_allColumns);
			});
		}
	}, [orderUIs]);

	const orderToOrderByProduct = async (_orders: Order[]) => {
		let entities: OrderByProductUI[] = [];

		const actions: Action[] = [
			{ icon: "toki-icon toki-icon-Next-icon", type: ActionType.next },
			{
				icon: "toki-icon toki-icon-Delete-icon",
				type: ActionType.delete,
				color: "#f45844",
			},
		];

		await _orders.forEach((order, orderIndex) =>
			order.items.forEach((product, index) => {
				entities.push({
					orderIndex: orderIndex,
					index: index,
					order_no: order.order_no,
					id: order._id,
					product_name: product.product_name,
					qty: product.qty,
					state: order.state,
					operation: actions,
					delivery_estimate: order.delivery_estimate,
					delivery_floor: order.delivery_floor,
					delivery_address: order.delivery_address,
					delivery_zone: order.delivery_zone,
					phone_no: order.phone_no,
					delivery_instruction: order.delivery_instruction,
					delivery_seat: order.delivery_seat,
					delivery_location: order.delivery_location,
					delivery_row: order.delivery_row,
					ebarimt_type: order.ebarimt_type,
					delivered_by: order.delivered_by,
					delivered_at: order.delivered_at,
					review_star: order.review_star,
					review_comment: order.review_comment,
					review_type: order.review_type,
					is_cancelled: product.is_cancelled,
					penalty: order.penalty,
					options: product.options,
					orderObject: order,
					company_reg_number: order.company_reg_number,
					office_name: order.office_name,
					product_price: product.product_price,
					promotion_price: product.promotion_price,
					estimate_minutes: order.estimate_minutes,
					penalty_merchant: order.penalty_merchant === true ? 1 : 0,
					penalty_delivery: order.penalty_delivery === true ? 1 : 0,
				});
			})
		);

		return entities;
	};

	useEffect(() => {
		let data = orderToOrderByProduct(props.orders).then((result: any) => {
			setOrderUIs(result);
		});
	}, [props.orders]);
	return (
		<>
			{loading ? (
				<LoadingSpinner />
			) : (
				<CustomTable
					className="table-merge"
					rowClassName={(record: OrderByProductUI) => {
						if (props.orderFilter.status === "ongoing") {
							let className = "";

							if (record.state === "paid") {
								className += "font-weight-semibold ";
							}

							if (record.orderObject.order_type === "delivery") {
								className += "table-row-delivery";
							} else {
								className += "table-row-take-away";
							}

							if (record.orderIndex % 2 === 0) {
								className += "-opaq";
							}

							return className;
						} else {
							if (record.orderIndex % 2 === 0) {
								return "row-striped";
							}
						}

						return "";
					}}
					columns={columns}
					dataSource={orderUIs}
					pagination={{
						pageSize: 10,
						total: orderUIs === undefined ? 0 : orderUIs?.length,
					}}
				/>
			)}
		</>
	);
};

const apiGetOrders = (
	orderFilter: OrderFilter,
	merchantId: string
): Promise<any> => {
	if (!orderFilter.search) {
		delete orderFilter.search;
	}

	if (!orderFilter.order_type) {
		delete orderFilter.order_type;
	}

	return axios.get(API_URL + "admin/dashboard/" + merchantId, {
		params: orderFilter,
		headers: authHeader(),
	});
};

export default function MerchantOrderTable(props: { merchantId: string }) {
	const [orderResponse, setOrderResponse] = useState<TokiPagination<Order>>({
		items: [],
	});
	const [loading, setLoading] = useState(false);
	const [orderFilter, setOrderFilter] = useState<OrderFilter>({
		page: 1,
		page_size: 10,
		sort: "date_desc",
	});

	const getOrders = () => {
		setLoading(true);
		apiGetOrders({ ...orderFilter, search: "" }, props.merchantId).then(
			(response) => {
				setOrderResponse(response.data.data);
				setLoading(false);
			}
		);
	};

	useEffect(() => {
		getOrders();
	}, [orderFilter]);

	return (
		<>
			{loading ? (
				<LoadingSpinner />
			) : (
				<OrderTable
					orders={orderResponse?.items}
					orderFilter={orderFilter}
					onReload={getOrders}
					merchantId={props.merchantId}
				/>
			)}
		</>
	);
}
