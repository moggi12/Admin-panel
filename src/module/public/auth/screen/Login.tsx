import { Form, Input, notification } from "antd";
import { useForm } from "antd/lib/form/Form";
import React from "react";
import { getRoles, login } from "../services/auth.service";
import { IOModal } from "../../../../shared/utils/Modal/Modal";
import Recover from "../components/Recover";
import NewPassword from "../components/NewPassword";
import { useParams } from "react-router-dom";
import { RolesUI } from "../entity/auth.model";

export default function Login() {
	const [form] = useForm();
	const { token } = useParams();

	const onFinish = (values: any) => {
		login(values.email, values.password).then((response) => {
			if (response.status_code === 0) {
				getRoles().then((response) => {
					let service: string = "none";
					let office: string = "none";
					let merchant: string = "none";
					let configure: string = "none";
					let dataReport: string = "none";
					let report: string = "none";
					let recommendation: string = "none";
					let userManagement: string = "none";
					response.data.data.scopes.forEach((element: string) => {
						let elementArray = element.split("_");
						if (elementArray[1] === "service") {
							service = elementArray[0];
						} else if (elementArray[1] === "office") {
							office = elementArray[0];
						} else if (elementArray[1] === "merchant") {
							merchant = elementArray[0];
						} else if (elementArray[1] === "configure") {
							configure = elementArray[0];
						} else if (elementArray[1] === "dataReport") {
							dataReport = elementArray[0];
						} else if (elementArray[1] === "report") {
							report = elementArray[0];
						} else if (elementArray[1] === "recommendation") {
							recommendation = elementArray[0];
						} else if (elementArray[1] === "userManagement") {
							userManagement = elementArray[0];
						}
					});
					let roles: RolesUI = {
						service: service,
						office: office,
						merchant: merchant,
						configure: configure,
						dataReport: dataReport,
						report: report,
						recommendation: recommendation,
						userManagement: userManagement,
					};
					localStorage.setItem("userRoles", JSON.stringify(roles));
					document.location.href = "/";
				});
			} else {
				notification.error({
					message: response.error,
					description: response.message,
				});
			}
		});
	};

	const showRecoverModal = () => {
		IOModal.showOnly({
			title: "Recover Password",
			content: <Recover />,
			cancelButtonProps: { style: { display: "none" } },
			okButtonProps: { style: { display: "none" } },
			closable: true,
		});
	};

	const showNewPasswordModal = () => {
		IOModal.showOnly({
			title: "Reset Password",
			content: <NewPassword token={token ? token : ""} />,
			cancelButtonProps: { style: { display: "none" } },
			okButtonProps: { style: { display: "none" } },
		});
	};

	if (token !== undefined) {
		showNewPasswordModal();
	}

	return (
		<Form className="login-form" onFinish={onFinish} form={form}>
			<div className="card-body">
				<img src="/toki.png" alt="toki" width={280} height={100} />
				<div className="my-3">
					<div className="row">
						<div className="col-md-6 font-weight-bold"></div>
					</div>
				</div>
				<div className="form-group form-group-feedback form-group-feedback-left">
					<label>Email Address</label>
					<Form.Item
						name="email"
						rules={[
							{
								required: true,
								message: "Enter your email",
							},
						]}
					>
						<Input
							prefix={
								<div className="form-control-feedback form-control-feedback-sm">
									<i className="mi-mail-outline"></i>
								</div>
							}
							placeholder=""
							className="form-control"
						/>
					</Form.Item>
				</div>
				<div className="form-group form-group-feedback form-group-feedback-left">
					<div className="row">
						<div className="col-4">
							<label>Password</label>
						</div>
						<div className="col-8 text-right">
							<a onClick={showRecoverModal} className="text-blue-300">
								Forgot Password?
							</a>
						</div>
					</div>
					<Form.Item
						name="password"
						rules={[
							{
								required: true,
								message: "Enter your password",
							},
							// {
							//     pattern: new RegExp(/^.{8,}$/),
							//     message: "Нууц үг хамгийн багадаа 8 тэмдэгтээс бүрдэх ёстой.",
							// },
						]}
					>
						<Input.Password
							prefix={
								<div className="form-control-feedback form-control-feedback-sm">
									<i className="mi-vpn-key"></i>
								</div>
							}
							placeholder=""
							className="form-control"
						/>
					</Form.Item>
				</div>
				<div className="row">
					<div className="col-md-6">
						<div className="form-group">
							<button type="submit" className="btn btn-primary btn-block">
								Login
							</button>
						</div>
					</div>
				</div>
			</div>
		</Form>
	);
}
