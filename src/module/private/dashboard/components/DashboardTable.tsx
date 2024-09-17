import { ColumnsType } from "antd/lib/table";
import { MerchantUI } from "../../merchant/entity/merchant.model";
import { Link } from "react-router-dom";
import {
	Action,
	ActionType,
} from "../../../../shared/utils/entity/utility.model";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Space, Table, Switch, notification } from "antd";
import { IOModal } from "../../../../shared/utils/Modal/Modal";
import PasswordContent from "../../componenets/PasswordModal/PasswordModal";
import {
	changeBusy,
	changeTempClosed,
	unblockMerchant,
} from "../../merchant/services/merchant.service";
import MerchantOrderTable from "./MerchantOrderTable";

export default function DashboardTable(props: {
	data: any;
	state: any;
	setState: any;
}) {
	const onBusyStatusChange = (merchantId: string, status: boolean) => {
		const UnblockMerchant = (id: string) => {
			changeBusy(id, !status).then((response) => {
				if (response.data.status_code === 0) {
					notification.success({
						message: response.data.error,
						description: response.data.message,
					});
					window.location.reload();
				} else {
					notification.error({
						message: response.data.error,
						description: response.data.message,
					});
				}
			});
		};

		IOModal.show({
			title: "Are you sure?",
			okText: "Yes",
			onOk: (args: any) => {
				IOModal.confirmForm({
					title: "Confirm your password",
					icon: undefined,
					content: (
						<PasswordContent
							handleFunction={() =>
								UnblockMerchant(merchantId ? merchantId : "")
							}
						/>
					),
					okButtonProps: {
						form: "password-confirmation-form",
						htmlType: "submit",
					},
				});
			},
		});
	};

	const onTempClosedChange = (merchantId: string, status: boolean) => {
		const UnblockMerchant = (id: string) => {
			changeTempClosed(id, !status).then((response) => {
				if (response.data.status_code === 0) {
					notification.success({
						message: response.data.error,
						description: response.data.message,
					});
					window.location.reload();
				} else {
					notification.error({
						message: response.data.error,
						description: response.data.message,
					});
				}
			});
		};

		IOModal.show({
			title: "Are you sure?",
			okText: "Yes",
			onOk: (args: any) => {
				IOModal.confirmForm({
					title: "Confirm your password",
					icon: undefined,
					content: (
						<PasswordContent
							handleFunction={() =>
								UnblockMerchant(merchantId ? merchantId : "")
							}
						/>
					),
					okButtonProps: {
						form: "password-confirmation-form",
						htmlType: "submit",
					},
				});
			},
		});
	};

	const onClickMerchant = (merchantId: string) => {
		IOModal.show({
			title: "Order details",
			content: (
				<div className="row px-1">
					<MerchantOrderTable merchantId={merchantId} />
				</div>
			),
			width: "80%",
		});
	};

	const columns: ColumnsType<any> = [
		{
			title: "№",
			dataIndex: "key",
			key: "key",
		},
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
			render: (name: string, record) => (
				<a
					style={{ color: "#FFC800" }}
					onClick={() => onClickMerchant(record.merchantId)}
				>
					{name}
				</a>
			),
		},
		{
			title: "Delivery",
			dataIndex: "delivery",
			key: "delivery",
		},
		{
			title: "Take-away",
			dataIndex: "takeAway",
			key: "takeAway",
		},
		{
			title: "Late",
			dataIndex: "late",
			key: "late",
		},
		{
			title: "Busy mode",
			dataIndex: "busyMode",
			key: "busyMode",
			render: (action: Action, record) => {
				return (
					<div>
						<Switch
							checked={record?.busyMode}
							onChange={() => {
								onBusyStatusChange(record.merchantId, record?.busyMode);
							}}
						/>
					</div>
				);
			},
		},
		{
			title: "Temporarily closed",
			dataIndex: "tempClosed",
			key: "tempClosed",
			render: (action: Action, record) => {
				return (
					<div>
						<Switch
							checked={record?.tempClosed}
							onChange={() => {
								onTempClosedChange(record.merchantId, record?.tempClosed);
							}}
						/>
					</div>
				);
			},
		},
	];

	const dataUIs: any = props.data?.map((data: any, index: number) => {
		return {
			...data,
			key: index + 1,
			index: index,
		};
	});

	return (
		<Table
			columns={columns}
			dataSource={dataUIs}
			className="table table-responsive"
			pagination={{ hideOnSinglePage: true }}
			rowClassName="table-row"
		/>
	);
}
