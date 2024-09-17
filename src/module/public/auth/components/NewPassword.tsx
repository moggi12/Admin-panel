import { Form, Input, Modal, notification } from "antd";
import { useForm } from "antd/lib/form/Form";
import React from "react";
import { validations } from "../../../../shared/validation/validations";
import { newPassword } from "../services/auth.service";

export default function NewPassword(props: { token: string }) {
	const [form] = useForm();

	const onFinish = (values: any) => {
		newPassword(props.token, values.password).then((response) => {
			if (response.data.status_code === 0) {
				notification.success({
					message: response.data.error,
					description: response.data.message,
				});
			} else {
				notification.error({
					message: response.data.error,
					description: response.data.message,
				});
			}
		});
		Modal.destroyAll();
	};

	return (
		<Form onFinish={onFinish} form={form}>
			<div className="form-group form-group-feedback">
				<label>New Password</label>
				<Form.Item
					name="password"
					rules={[...validations.ENTER_PASSWORD, ...validations.PASSWORD]}
				>
					<Input.Password className="form-control" />
				</Form.Item>
			</div>
			<div className="form-group form-group-feedback">
				<label>Repeat Password</label>
				<Form.Item
					name="repeatPassword"
					rules={[
						...validations.ENTER_PASSWORD,
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue("password") === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error("Wrong password!"));
							},
						}),
					]}
				>
					<Input.Password className="form-control" />
				</Form.Item>
			</div>
			<div className="row">
				<div className="col-md-6">
					<button onClick={() => Modal.destroyAll()} className="btn btn-block">
						Close
					</button>
				</div>
				<div className="col-md-6">
					<button type="submit" className="btn btn-primary btn-block">
						Submit
					</button>
				</div>
			</div>
		</Form>
	);
}
