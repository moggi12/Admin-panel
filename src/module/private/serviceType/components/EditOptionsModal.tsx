import {Form, Input, Modal, notification} from "antd";
import { Select } from 'antd';
import {useState} from "react";
import {useForm} from "antd/lib/form/Form";
import {ServiceTypeOptionsUI} from "../entity/serviceType.model";
import {addOptions, editOptions} from "../services/service.service";
import {validations} from "../../../../shared/validation/validations";

const { Option } = Select;

export default function EditOptionsModal(props: {data?: ServiceTypeOptionsUI|undefined}) {
    const [value, setValue] = useState(props.data?.type)
    const [form] = useForm();

    const onFinish = (values: { name: string, type: string, value?: string }) => {
        if(values.value === undefined){
            if(values.type==="text"){
                values.value = "Any Text"
            }else if(values.type==="number"){
                values.value = "Any Number"
            }
        }
        if (props.data === undefined){
            addOptions(values.name, values.type, values.value).then((response)=>{
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
            editOptions(values.name, values.type, values.value, props.data.id).then((response)=>{
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
        Modal.destroyAll();
    };

    return (
        <>
            {props.data === undefined ?
                <Form name="edit-option-form" onFinish={onFinish} form={form}>
                    <div className="row">
                        <div className="col-md-4 py-1">
                            <p>Option name:</p>
                        </div>
                        <div className="col-md-8 py-1">
                            <Form.Item name="name" rules={[
                                {
                                    required: true,
                                    message: "Option name required.",
                                },...validations.CHARMAXFIFTY
                            ]}>
                                <Input/>
                            </Form.Item>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 py-1">
                            <p>Value Type:</p>
                        </div>
                        <div className="col-md-8 py-1">
                            <Form.Item name="type" rules={[
                                {
                                    required: true,
                                    message: "Value type required.",
                                },
                            ]}>
                                <Select placeholder="Select" style={{width: '100wv'}} onChange={(e) => setValue(e)}>
                                    <Option value="text">Text</Option>
                                    <Option value="number">Number</Option>
                                    <Option value="list">List</Option>
                                </Select>
                            </Form.Item>
                        </div>
                    </div>
                    {value === "list" ?
                        <div className="row">
                            <div className="col-md-4 py-1">
                                <p>Value:</p>
                            </div>
                            <div className="col-md-8 py-1">
                                <Form.Item name="value" rules={[
                                    {
                                        required: true,
                                        message: "Value required.",
                                    },
                                ]}>
                                    <Input/>
                                </Form.Item>
                            </div>
                        </div> : <></>
                    }
                </Form> :
                <Form name="edit-option-form" onFinish={onFinish} form={form}>
                    <div className="row">
                        <div className="col-md-4 py-1">
                            <p>Option name:</p>
                        </div>
                        <div className="col-md-8 py-1">
                            <Form.Item name="name"
                                       initialValue={props.data.option}
                                       rules={[
                                {
                                    required: true,
                                    message: "Option name required.",
                                }, ...validations.CHARMAXFIFTY,
                            ]}>
                                <Input />
                            </Form.Item>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 py-1">
                            <p>Value Type:</p>
                        </div>
                        <div className="col-md-8 py-1">
                            <Form.Item name="type"
                                        initialValue={props.data.type.toLowerCase()}
                                       rules={[
                                {
                                    required: true,
                                    message: "Value type required.",
                                },
                            ]}>
                                <Select style={{width: '100wv'}} onChange={(e) => setValue(e)}>
                                    <Option value="text">Text</Option>
                                    <Option value="number">Number</Option>
                                    <Option value="list">List</Option>
                                </Select>
                            </Form.Item>
                        </div>
                    </div>
                    {value === "list" ?
                        <div className="row">
                            <div className="col-md-4 py-1">
                                <p>Value:</p>
                            </div>
                            <div className="col-md-8 py-1">
                                <Form.Item name="value"
                                           initialValue={props.data.value}
                                           rules={[
                                    {
                                        required: true,
                                        message: "Value required.",
                                    },
                                ]}>
                                    <Input/>
                                </Form.Item>
                            </div>
                        </div> : <></>
                    }
                </Form>
            }
        </>
    )
}