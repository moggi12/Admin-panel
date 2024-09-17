import {Form, Input, Modal, notification} from "antd";
import {useForm} from "antd/lib/form/Form";
import {EstimateVariablesUI} from "../entity/serviceType.model";
import {editCategoryEstimate, editCategoryEstimateByMerchant} from "../services/service.service";
import {useParams} from "react-router";

export default function EditEstimateVariableModal(props: {data?:EstimateVariablesUI|undefined, merchantId?: string | undefined}) {
    const [form] = useForm();
    console.log(props.merchantId)
    const onFinish = (values: any) => {
        if(props.merchantId === undefined){
            editCategoryEstimate(values.value, values.deliveryValue, props.data?.id).then((response)=>{
                if(response.data.status_code === 0){
                    Modal.destroyAll();
                    window.location.reload()
                }else {
                    notification.error({
                        message: response.data.error,
                        description: response.data.message
                    })
                }

            })
        } else{
            editCategoryEstimateByMerchant(values.value, values.deliveryValue, props.data?.id, props.merchantId).then((response)=>{
                if(response.data.status_code === 0){
                    Modal.destroyAll();
                    window.location.reload()
                }else {
                    notification.error({
                        message: response.data.error,
                        description: response.data.message
                    })
                }

            })
        }

    };
    return(
        <Form name="edit-estimate-variable-form" layout="vertical" onFinish={onFinish} form={form}>
            <div className="row">
                <div className="col-md-4">
                    <p>{props.data?.category}:</p>
                </div>
                <div className="col-md-8">
                    <Form.Item name="value"
                               label="Prepare Estimate"
                               initialValue={props.data?.estimates}
                               rules={[
                        {
                            required: true,
                            message: "Value required.",
                        },
                    ]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item name="deliveryValue"
                               label="Delivery Estimate"
                               initialValue={props.data?.deliveryEstimate}
                               rules={[
                                   {
                                       required: true,
                                       message: "Value required.",
                                   },
                               ]}>
                        <Input/>
                    </Form.Item>
                </div>
            </div>
        </Form>
    )
}