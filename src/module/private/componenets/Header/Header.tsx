import "./Header.css";
import { useLocation, useParams } from "react-router";
import { IOModal } from "../../../../shared/utils/Modal/Modal";
import EditOfficeModal from "../../office/components/EditOfficeModal";
import AddAdminModal from "../../userManagement/components/AddAdminModal";
import AddRolesModal from "../../roles/components/AddRolesModal";
import PasswordContent from "../PasswordModal/PasswordModal";
import {
	blockMerchant,
	createBanner,
	editBanner,
	getBanner,
	unblockMerchant,
} from "../../merchant/services/merchant.service";
import { DatePicker, Form, Input, Modal, notification, Select } from "antd";
import { useNavigate } from "react-router-dom";
import UploadImage from "../../../../shared/component/UploadImage/UploadImage";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import moment from "moment";
import { uploadImage } from "../../office/services/upload.service";
import { addOffice, editOffice } from "../../office/services/office.service";
const { Option } = Select;

export default function Header() {
	let { state } = useLocation() as any;
	let title = state?.headerTitle as string;
	let button = state?.headerButton as string;
	let clickFunctionProps = state?.clickFunctionProps as any;
	const navigate = useNavigate();
	let banner: any;

	if (state?.merchantId !== undefined) {
		console.log("AAAAAA");
		getBanner(state.merchantId).then((res) => {
			console.log(res.data);
			if (res.data.status_code === 404) {
				banner = undefined;
			} else {
				banner = {
					...res.data.data,
					start_date: moment(res.data.data.start_date),
					end_date: moment(res.data.data.end_date),
				};
			}
		});
	}

	if (title === "Office") {
		clickFunctionProps.content = <EditOfficeModal />;
		clickFunctionProps.okButtonProps = {
			form: "edit-office-form",
			htmlType: "submit",
		};
		clickFunctionProps.icon = undefined;
	}
	if (button === "Add admin") {
		clickFunctionProps.content = <AddAdminModal />;
		clickFunctionProps.okButtonProps = {
			form: "add-admin-form",
			htmlType: "submit",
		};
		clickFunctionProps.icon = undefined;
	}

	if (button === "Add Roles") {
		clickFunctionProps.content = <AddRolesModal />;
		clickFunctionProps.width = "700px";
		clickFunctionProps.okButtonProps = {
			form: "add-role-form",
			htmlType: "submit",
		};
		clickFunctionProps.icon = undefined;
	}

	if (title === undefined) {
		title = "Welcome";
	}

	if (button === "Block Merchant") {
		let merchantId = state?.merchantId as string;
		const BlockMerchant = (id: string) => {
			blockMerchant(id).then((response) => {
				if (response.data.status_code === 0) {
					notification.success({
						message: response.data.error,
						description: response.data.message,
					});
					navigate("merchant");
				} else {
					notification.error({
						message: response.data.error,
						description: response.data.message,
					});
				}
			});
		};
		clickFunctionProps.onOk = (args: any) => {
			IOModal.confirmForm({
				title: "Confirm your password",
				icon: undefined,
				content: (
					<PasswordContent
						handleFunction={() => BlockMerchant(merchantId ? merchantId : "")}
					/>
				),
				okButtonProps: {
					form: "password-confirmation-form",
					htmlType: "submit",
				},
			});
		};
	}

	if (button === "Unblock Merchant") {
		let merchantId = state?.merchantId as string;
		const UnblockMerchant = (id: string) => {
			unblockMerchant(id).then((response) => {
				if (response.data.status_code === 0) {
					notification.success({
						message: response.data.error,
						description: response.data.message,
					});
					navigate("merchant");
				} else {
					notification.error({
						message: response.data.error,
						description: response.data.message,
					});
				}
			});
		};
		clickFunctionProps.onOk = (args: any) => {
			IOModal.confirmForm({
				title: "Confirm your password",
				icon: undefined,
				content: (
					<PasswordContent
						handleFunction={() => UnblockMerchant(merchantId ? merchantId : "")}
					/>
				),
				okButtonProps: {
					form: "password-confirmation-form",
					htmlType: "submit",
				},
			});
		};
	}

	const onClick = () => {
		if (button === "Block Merchant" || button === "Unblock Merchant") {
			IOModal.confirm(clickFunctionProps);
		} else {
			IOModal.confirmForm(clickFunctionProps);
		}
	};

	const onClickBanner = () => {
		IOModal.confirmForm({
			title: "Banner details ",
			icon: undefined,
			content: <BannerForm banner={banner} />,
			okButtonProps: { form: "banner-form", htmlType: "submit" },
		});
	};

	const BannerForm = (props: any) => {
		const [form] = useForm();

		const onFinish = (values: any) => {
			uploadImage(values.image).then((response) => {
				if (props.banner === undefined) {
					createBanner(
						{ ...values, merchant: state.merchantId },
						response.data.data.file_path
					).then((response) => {
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
				} else {
					if (response.data.status_code === 320) {
						editBanner(
							props.banner._id,
							{ ...values, merchant: state.merchantId },
							props.banner.image
						).then((response) => {
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
					} else {
						editBanner(
							props.banner._id,
							{ ...values, merchant: state.merchantId },
							response.data.data.file_path
						).then((response) => {
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
					}
				}
			});
			Modal.destroyAll();
		};
		return (
			<Form
				name="banner-form"
				onFinish={onFinish}
				form={form}
				initialValues={props.banner}
			>
				<div className="row py-1">
					<div className="col-md-4">
						<p>Banner title:</p>
					</div>
					<div className="col-md-8">
						<Form.Item name="title">
							<Input />
						</Form.Item>
					</div>
				</div>
				<div className="row py-1">
					<div className="col-md-4">
						<p>Repeat:</p>
					</div>
					<div className="col-md-8">
						<Form.Item
							name="type"
							rules={[
								{
									required: true,
									message: "Type required.",
								},
							]}
						>
							<Select placeholder="Select">
								<Option value="single">Only this time</Option>
								<Option value="multiple">Repeat</Option>
							</Select>
						</Form.Item>
					</div>
				</div>
				<div className="row py-1">
					<div className="col-md-4">
						<p>Insert image:</p>
					</div>
					<div className="col-md-8">
						{banner?.image === undefined ? (
							<>
								<Form.Item
									name="image"
									rules={[
										{
											required: true,
											message: "Answer required.",
										},
									]}
								>
									<UploadImage />
								</Form.Item>
							</>
						) : (
							<>
								<Form.Item
									name="image"
									rules={[
										{
											required: true,
											message: "Answer required.",
										},
									]}
								>
									<UploadImage image={banner.image} type="image" />
								</Form.Item>
							</>
						)}
					</div>
				</div>
				<div className="row py-1">
					<div className="col-md-4">
						<p>Start date:</p>
					</div>
					<div className="col-md-8">
						<Form.Item
							name="start_date"
							rules={[
								{
									required: true,
									message: "Start date required.",
								},
							]}
						>
							<DatePicker
								showTime
								format={"YYYY-MM-DD HH:mm"}
								suffixIcon={null}
								placeholder="yyyy/mm/dd"
							/>
						</Form.Item>
					</div>
				</div>
				<div className="row py-1">
					<div className="col-md-4">
						<p>End date:</p>
					</div>
					<div className="col-md-8">
						<Form.Item
							name="end_date"
							rules={[
								{
									required: true,
									message: "End date required.",
								},
							]}
						>
							<DatePicker
								showTime
								format={"YYYY-MM-DD HH:mm"}
								suffixIcon={null}
								placeholder="yyyy/mm/dd"
							/>
						</Form.Item>
					</div>
				</div>
			</Form>
		);
	};

	return (
		<div
			className="header-bottom pb-2 d-flex justify-content-between align-items-center"
			style={{ marginBottom: "3.094rem" }}
		>
			<h1 className="font-weight-medium" style={{ height: "2.625rem" }}>
				{title}
			</h1>
			<div className="d-flex">
				{state?.merchantId !== undefined ? (
					<>
						<button className="add-button mr-3" onClick={onClickBanner}>
							<h3 className="font-weight-medium text-primary text-center">
								Place Banner
							</h3>
						</button>
						{button ? (
							<button className="add-button" onClick={onClick}>
								<h3 className="font-weight-medium text-primary text-center">
									{button}
								</h3>
							</button>
						) : (
							""
						)}
					</>
				) : (
					<>
						{button ? (
							<button className="add-button" onClick={onClick}>
								<h3 className="font-weight-medium text-primary text-center">
									{button}
								</h3>
							</button>
						) : (
							""
						)}
					</>
				)}
			</div>
		</div>
	);
}
