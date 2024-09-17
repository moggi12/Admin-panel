import { Form, Input, Modal, notification } from "antd";
import { useForm } from "antd/lib/form/Form";
import React from "react";
import { validations } from "../../../../shared/validation/validations";
import { recover } from "../services/auth.service";

export default function Recover() {
	const [form] = useForm();

	const onFinish = (values: any) => {
		recover(values.email).then((response) => {
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
			Modal.destroyAll();
		});
	};

	return (
		<Form onFinish={onFinish} form={form}>
			<div className="form-group form-group-feedback form-group-feedback-left">
				<label>Email Address</label>
				<Form.Item
					name="email"
					rules={[
						{
							required: true,
							message: "Enter your email address.",
						},
					]}
				>
					<Input
						prefix={
							<div className="form-control-feedback form-control-feedback-sm">
								<i className="mi-mail-outline " />
							</div>
						}
						placeholder=""
						className="form-control"
					/>
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
