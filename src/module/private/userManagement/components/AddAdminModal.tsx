import {Form, Input, Modal, notification, Select} from "antd";
import {useForm} from "antd/lib/form/Form";
import {useEffect, useState} from "react";
import {getRoles} from "../../roles/services/role.service";
import {addUser} from "../services/user.service";
import {IOModal} from "../../../../shared/utils/Modal/Modal";
import {validations} from "../../../../shared/validation/validations";
const { Option } = Select;

export default function AddAdminModal() {
    const [form] = useForm();
    const [option, setOption] = useState([])

    useEffect(()=>{
        getRoles().then((response)=>{
            let tableData = response.data.data.map((values: any)=>{
                return{
                    id: values._id,
                    name: values.name,
                }
            })
            setOption(tableData)
        })

    }, [])

    const onFinish = (values: any) => {
        addUser(values.name, values.email, values.role).then((response)=>{
            if(response.data.status_code === 0){
                IOModal.show({
                    title: "Амжилттай",
                    content: <div className="text-center">Админ амжилттай нэмэгдэж хэрэглэгчийн e-mail хаяг руу нууц үг илгээгдлээ</div>,
                    onOk: args => {
                        window.location.reload()
                    },
                    cancelButtonProps: { style: {display: 'none'}}
                })
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
        <Form name="add-admin-form" onFinish={onFinish} form={form}>
            <div className="row" style={{paddingTop: '10px',whiteSpace: 'nowrap', overflow: 'hidden !important', textOverflow: 'ellipsis !important'}}>
                <div className="col-md-12 py-1">
                    <div className="d-flex">
                        <p className="m-0 pr-2 pt-1" style={{width: '200px'}}>Admin name:</p>
                        <Form.Item name="name"
                                   rules={[
                                       {
                                           required: true,
                                           message: "Name required.",
                                       }, ...validations.CHARMAXFIFTY,
                                   ]}>
                            <Input/>
                        </Form.Item>
                    </div>
                </div>
                <div className="col-md-12 py-1">
                    <div className="d-flex">
                        <p className="m-0 pr-2 pt-1" style={{width: '200px'}}>Email address:</p>
                        <Form.Item name="email"
                                   rules={[
                                       {
                                           required: true,
                                           message: "Email required.",
                                       },
                                   ]}>
                            <Input/>
                        </Form.Item>
                    </div>
                </div>
                <div className="col-md-12" style={{paddingTop: '10px', paddingBottom: '10px'}}>
                    <div className="d-flex align-items-center justify-content-between">
                        <p className="m-0 pr-2" style={{width: '200px'}}>Roles</p>
                        <Form.Item name="role"
                                   rules={[
                                       {
                                           required: true,
                                           message: "Email required.",
                                       },
                                   ]}>
                            <Select placeholder="Select" style={{width: '100wv'}}>
                                {option.map((value: any)=>{
                                    return(
                                        <Option value={value.id}>{value.name}</Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                    </div>
                </div>
            </div>
        </Form>
    )
}