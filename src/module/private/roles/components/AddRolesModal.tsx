import {useForm} from "antd/lib/form/Form";
import {Form, Input, Modal, notification, Select} from "antd";
import {addRoles, editRoles, getRoles} from "../services/role.service";
import {RolesUI} from "../entity/roles.model";
import {validations} from "../../../../shared/validation/validations";
import { getUserRoles } from "../../../public/auth/services/auth.service";
const { Option } = Select;


export default function AddRolesModal(props: {data?: RolesUI}) {
    const userRoles = getUserRoles()
    const [form] = useForm();

    const onFinish = (values: any) => {
        let name = values.name;
        delete values.name;
        let roles = Object.values(values)
        if(userRoles.roles === "edit"){
            if (props.data === undefined){
                addRoles(name, roles).then((response)=>{
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
            } else {
                editRoles(name, roles, props.data.id).then((response)=>{
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
            }
        } else{
            notification.error({
                message: "Error 403",
                description: "Permission denied."
            })
        }
        

        Modal.destroyAll();
    };

    return(
        <Form name="add-role-form" onFinish={onFinish} form={form}>
            <div className="row" style={{paddingTop: '10px',whiteSpace: 'nowrap', overflow: 'hidden !important', textOverflow: 'ellipsis !important'}}>
                <div className="col-md-6 py-1">
                    <div className="d-flex">
                        <p className="m-0 pr-2 pt-1" style={{width: '200px'}}>Role name:</p>
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
                <div className="col-md-6 py-1">
                </div>
                <div className="col-md-12" style={{paddingTop: '20px', paddingBottom: '10px'}}>
                    <p className="m-0 pr-2 pt-1" style={{width: '200px'}}>Access type</p>
                </div>
                <div className="col-md-6" style={{paddingTop: '10px', paddingBottom: '10px'}}>
                    <div className="d-flex">
                        <p className="m-0 pr-2 pt-1" style={{width: '200px'}}>Service type</p>
                        <Form.Item name="serviceType"
                                   initialValue={props.data?.scopes?.service}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Service type required.",
                                       },
                                   ]}>
                            <Select>
                                <Option value="edit_service">Edit</Option>
                                <Option value="view_service">View</Option>
                                <Option value="none_service">None</Option>
                            </Select>
                        </Form.Item>
                    </div>
                </div>
                <div className="col-md-6" style={{paddingTop: '10px', paddingBottom: '10px'}}>
                    <div className="d-flex">
                        <p className="m-0 pr-2 pt-1" style={{width: '200px'}}>Office</p>
                        <Form.Item name="office"
                                   initialValue={props.data?.scopes?.office}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Office required.",
                                       },
                                   ]}>
                            <Select>
                                <Option value="edit_office">Edit</Option>
                                <Option value="view_office">View</Option>
                                <Option value="none_office">None</Option>
                            </Select>
                        </Form.Item>
                    </div>
                </div>
                <div className="col-md-6" style={{paddingTop: '10px', paddingBottom: '10px'}}>
                    <div className="d-flex">
                        <p className="m-0 pr-2 pt-1" style={{width: '200px'}}>Merchant</p>
                        <Form.Item name="merchant"
                                   initialValue={props.data?.scopes?.merchant}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Merchant required.",
                                       },
                                   ]}>
                            <Select>
                                <Option value="edit_merchant">Edit</Option>
                                <Option value="view_merchant">View</Option>
                                <Option value="none_merchant">None</Option>
                            </Select>
                        </Form.Item>
                    </div>
                </div>
                <div className="col-md-6" style={{paddingTop: '10px', paddingBottom: '10px'}}>
                    <div className="d-flex">
                        <p className="m-0 pr-2 pt-1" style={{width: '200px'}}>Configure</p>
                        <Form.Item name="configure"
                                   initialValue={props.data?.scopes?.configure}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Configure required.",
                                       },
                                   ]}>
                            <Select>
                                <Option value="edit_configure">Edit</Option>
                                <Option value="view_configure">View</Option>
                                <Option value="none_configure">None</Option>
                            </Select>
                        </Form.Item>
                    </div>
                </div>
                <div className="col-md-6" style={{paddingTop: '10px', paddingBottom: '10px'}}>
                    <div className="d-flex">
                        <p className="m-0 pr-2 pt-1" style={{width: '200px'}}>Data report</p>
                        <Form.Item name="dataReport"
                                   initialValue={props.data?.scopes?.dataReport}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Data report required.",
                                       },
                                   ]}>
                            <Select>
                                <Option value="edit_dataReport">Edit</Option>
                                <Option value="view_dataReport">View</Option>
                                <Option value="none_dataReport">None</Option>
                            </Select>
                        </Form.Item>
                    </div>
                </div>
                <div className="col-md-6" style={{paddingTop: '10px', paddingBottom: '10px'}}>
                    <div className="d-flex">
                        <p className="m-0 pr-2 pt-1" style={{width: '200px'}}>Review</p>
                        <Form.Item name="report"
                                   initialValue={props.data?.scopes?.report}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Report required.",
                                       },
                                   ]}>
                            <Select>
                                <Option value="edit_report">Edit</Option>
                                <Option value="view_report">View</Option>
                                <Option value="none_report">None</Option>
                            </Select>
                        </Form.Item>
                    </div>
                </div>
                <div className="col-md-6" style={{paddingTop: '10px', paddingBottom: '10px'}}>
                    <div className="d-flex">
                        <p className="m-0 pr-2 pt-1" style={{width: '200px'}}>Recommendation</p>
                        <Form.Item name="recommendation"
                                   initialValue={props.data?.scopes?.recommendation}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Recommendation required.",
                                       },
                                   ]}>
                            <Select>
                                <Option value="edit_recommendation">Edit</Option>
                                <Option value="view_recommendation">View</Option>
                                <Option value="none_recommendation">None</Option>
                            </Select>
                        </Form.Item>
                    </div>
                </div>
                <div className="col-md-6" style={{paddingTop: '10px', paddingBottom: '10px'}}>
                    <div className="d-flex">
                        <p className="m-0 pr-2 pt-1" style={{width: '200px'}}>User management</p>
                        <Form.Item name="userManagement"
                                   initialValue={props.data?.scopes?.userManagement}
                                   rules={[
                                       {
                                           required: true,
                                           message: "User management required.",
                                       },
                                   ]}>
                            <Select>
                                <Option value="edit_userManagement">Edit</Option>
                                <Option value="view_userManagement">View</Option>
                                <Option value="none_userManagement">None</Option>
                            </Select>
                        </Form.Item>
                    </div>
                </div>
                <div className="col-md-6" style={{paddingTop: '10px', paddingBottom: '10px'}}>
                    <div className="d-flex">
                        <p className="m-0 pr-2 pt-1" style={{width: '200px'}}>Roles</p>
                        <Form.Item name="roles"
                                   initialValue={props.data?.scopes?.roles}
                                   rules={[
                                       {
                                           required: true,
                                           message: "Roles required.",
                                       },
                                   ]}>
                            <Select>
                                <Option value="edit_roles">Edit</Option>
                                <Option value="view_roles">View</Option>
                                <Option value="none_roles">None</Option>
                            </Select>
                        </Form.Item>
                    </div>
                </div>
            </div>
        </Form>
    )
}