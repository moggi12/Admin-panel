import {Form, Input, Modal, notification, Select} from "antd";
import {useForm} from "antd/lib/form/Form";
import {UserUI} from "../entity/user.model";
import {useEffect, useState} from "react";
import {getRoles} from "../../roles/services/role.service";
import {editUser} from "../services/user.service";
import {validations} from "../../../../shared/validation/validations";

const { Option } = Select;

export default function EditUserModal(props: {data?:UserUI|undefined}) {
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
        editUser(values.name, values.email, values.role, props.data?.id ? props.data.id : "").then((response)=>{
            if(response.data.status_code === 0){
                notification.success({
                    message: response.data.error,
                    description: response.data.message
                })
                localStorage.setItem("roleInfo", JSON.stringify({_id: values.role}));
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
        <Form name="edit-user-form" onFinish={onFinish} form={form}>
            <div className="row">
                <div className="col-md-12" style={{paddingTop: '10px', paddingBottom: '10px'}}>
                    <div className="d-flex align-items-center justify-content-between">
                        <p className="m-0 pr-2" style={{width: '200px'}}>Name</p>
                        <Form.Item name="name"
                                   initialValue={props.data?.name}
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
                <div className="col-md-12" style={{paddingTop: '10px', paddingBottom: '10px'}}>
                    <div className="d-flex align-items-center justify-content-between">
                        <p className="m-0 pr-2" style={{width: '200px'}}>Email</p>
                        <Form.Item name="email"
                                   initialValue={props.data?.email}
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
                                   initialValue={props.data?.role}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Email required.",
                                       },
                                   ]}>
                            <Select placeholder="Select" style={{width: '100wv'}}>
                                {option.map((value: any)=>{
                                    return(
                                        <Option value={value.id} key={value.id}>{value.name}</Option>
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