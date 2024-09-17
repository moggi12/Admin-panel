import {Input, Form, notification, Modal} from "antd";
import {useForm} from "antd/lib/form/Form";
import {checkPassword} from "../../../public/auth/services/auth.service";

export default function PasswordContent(props: {handleFunction: any}){
    const [form] = useForm();
    const onFinish = (values: any) => {
        checkPassword(values.password).then((response) => {
            if(response.data.status_code === 0){
                props.handleFunction()
                Modal.destroyAll();
            }else {
                notification.error({
                    message: response.data.error,
                    description: response.data.message
                })
            }
        });
    }
    return(
        <Form name="password-confirmation-form" onFinish={onFinish} form={form}>
            <div className="row mt-3">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-4">
                            Password:
                        </div>
                        <div className="col-md-8">
                            <Form.Item name="password">
                                <Input.Password/>
                            </Form.Item>

                        </div>
                    </div>
                </div>
            </div>
        </Form>
    )
}

