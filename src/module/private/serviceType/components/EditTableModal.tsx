import {Form, Input, Modal, notification} from "antd";
import {useForm} from "antd/lib/form/Form";
import {TableUI} from "../entity/serviceType.model";
import {editTableName} from "../services/service.service";
import {validations} from "../../../../shared/validation/validations";

export default function EditTableModal(props: {data?:TableUI|undefined}) {
    const [form] = useForm();

    const onFinish = (values: any) => {
        editTableName(props.data?.key ? props.data.key : "", values.value, props.data?.isShow ? props.data.isShow : true).then((response)=>{
            if(response.data.status_code === 0){
                notification.success({
                    message: response.data.error,
                    description: response.data.message
                })
                window.location.reload()
            }else {
                notification.error({
                    message: response.data.error,
                    description: response.data.message
                })
            }
        })
        Modal.destroyAll();
    };
    return(
        <Form name="edit-table-form" onFinish={onFinish} form={form}>
            <div className="row">
                <div className="col-md-4">
                    <p>Column name:</p>
                </div>
                <div className="col-md-8">
                    <Form.Item name="value"
                               initialValue={props.data?.name}
                               rules={[
                                   {
                                       required: true,
                                       message: "Table name required.",
                                   }, ...validations.MAXFIFTY
                               ]}>
                        <Input/>
                    </Form.Item>
                </div>
            </div>
        </Form>
    )
}