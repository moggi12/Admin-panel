import {Form, Input, Modal, notification, Select} from "antd";
import {useForm} from "antd/lib/form/Form";
import {ConfigurationsUI} from "../entity/serviceType.model";
import {editConfig, editConfigMerchant} from "../services/service.service";
import {updateMerchantInfo} from "../../merchant/services/merchant.service";
const { Option } = Select;

export default function EditConfigurationModal(props: {data:ConfigurationsUI, merchantId?: any}) {
    const [form] = useForm();

    const onFinish = (values: any) => {
        if(props.merchantId === undefined){
            editConfig(props.data.id, values.value).then((response)=>{
                if(response.data.status_code === 0){
                    window.location.reload()
                }else {
                    notification.error({
                        message: response.data.error,
                        description: response.data.message
                    })
                }
            })
        } else{
            if(values.isDelivery === undefined){
                editConfigMerchant(props.data.id, values.value, props.merchantId).then((response)=>{
                    if(response.data.status_code === 0){
                        window.location.reload()
                    }else {
                        notification.error({
                            message: response.data.error,
                            description: response.data.message
                        })
                    }
                })
            } else{
                updateMerchantInfo(props.merchantId, values.isDelivery).then((response)=>{
                    if(response.data.status_code === 0){
                        window.location.reload()
                    }else {
                        notification.error({
                            message: response.data.error,
                            description: response.data.message
                        })
                    }
                })
            }

        }

        Modal.destroyAll();
    };
    return(
        <Form name="edit-configuration-form" onFinish={onFinish} form={form}>
            <div className="row">
                <div className="col-md-4">
                    <p>{props.data?.factor}:</p>
                </div>
                <div className="col-md-8">
                    {
                        props.data?.id === "isDelivery" ?
                            <>
                                <Form.Item name="isDelivery"
                                           initialValue={props.data?.isDelivery}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: "Value required.",
                                               },
                                           ]}>
                                    <Select>
                                        <Option value={true}>Active</Option>
                                        <Option value={false}>Disabled</Option>
                                    </Select>

                                </Form.Item>
                            </>
                            :
                            <>
                                <Form.Item name="value"
                                           initialValue={props.data?.measurement}
                                           rules={[
                                               {
                                                   required: true,
                                                   message: "Value required.",
                                               },
                                           ]}>
                                    <Input/>
                                </Form.Item>
                            </>
                    }

                </div>
            </div>
        </Form>
    )
}