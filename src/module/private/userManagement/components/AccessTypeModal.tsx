import {Form, Modal, Select} from 'antd';
import {UserUI} from "../entity/user.model";
import {useForm} from "antd/lib/form/Form";

const { Option } = Select;
export default function AccessTypeModal(props: {data: UserUI}) {
    const [form] = useForm();

    const onFinish = (values: any) => {
        console.log(values);
        Modal.destroyAll();
    };
    return(
        <Form name="edit-access-type-form" onFinish={onFinish} form={form}>
            <div className="row" style={{paddingTop: '10px',whiteSpace: 'nowrap', overflow: 'hidden !important', textOverflow: 'ellipsis !important'}}>
                <div className="col-md-6" style={{paddingTop: '10px', paddingBottom: '10px'}}>
                    <div className="d-flex">
                        <p className="m-0 pr-2 pt-1" style={{width: '200px'}}>Service type</p>
                        <Form.Item name="serviceType"
                                   rules={[
                                       {
                                           required: true,
                                           message: "Service type required.",
                                       },
                                   ]}>
                            <Select>
                                <Option value="Edit">Edit</Option>
                                <Option value="View">View</Option>
                                <Option value="None">None</Option>
                            </Select>
                        </Form.Item>
                    </div>
                </div>
                <div className="col-md-6" style={{paddingTop: '10px', paddingBottom: '10px'}}>
                    <div className="d-flex">
                        <p className="m-0 pr-2 pt-1" style={{width: '200px'}}>Office</p>
                        <Form.Item name="office"
                                   rules={[
                                       {
                                           required: true,
                                           message: "Office required.",
                                       },
                                   ]}>
                            <Select>
                                <Option value="Edit">Edit</Option>
                                <Option value="View">View</Option>
                                <Option value="None">None</Option>
                            </Select>
                        </Form.Item>
                    </div>
                </div>
                <div className="col-md-6" style={{paddingTop: '10px', paddingBottom: '10px'}}>
                    <div className="d-flex">
                        <p className="m-0 pr-2 pt-1" style={{width: '200px'}}>Merchant</p>
                        <Form.Item name="merchant"
                                   rules={[
                                       {
                                           required: true,
                                           message: "Merchant required.",
                                       },
                                   ]}>
                            <Select>
                                <Option value="Edit">Edit</Option>
                                <Option value="View">View</Option>
                                <Option value="None">None</Option>
                            </Select>
                        </Form.Item>
                    </div>
                </div>
                <div className="col-md-6" style={{paddingTop: '10px', paddingBottom: '10px'}}>
                    <div className="d-flex">
                        <p className="m-0 pr-2 pt-1" style={{width: '200px'}}>Configure</p>
                        <Form.Item name="configure"
                                   rules={[
                                       {
                                           required: true,
                                           message: "Configure required.",
                                       },
                                   ]}>
                            <Select>
                                <Option value="Edit">Edit</Option>
                                <Option value="View">View</Option>
                                <Option value="None">None</Option>
                            </Select>
                        </Form.Item>
                    </div>
                </div>
                <div className="col-md-6" style={{paddingTop: '10px', paddingBottom: '10px'}}>
                    <div className="d-flex">
                        <p className="m-0 pr-2 pt-1" style={{width: '200px'}}>Data report</p>
                        <Form.Item name="dataReport"
                                   rules={[
                                       {
                                           required: true,
                                           message: "Data report required.",
                                       },
                                   ]}>
                            <Select>
                                <Option value="Edit">Edit</Option>
                                <Option value="View">View</Option>
                                <Option value="None">None</Option>
                            </Select>
                        </Form.Item>
                    </div>
                </div>
                <div className="col-md-6" style={{paddingTop: '10px', paddingBottom: '10px'}}>
                    <div className="d-flex">
                        <p className="m-0 pr-2 pt-1" style={{width: '200px'}}>Report</p>
                        <Form.Item name="report"
                                   rules={[
                                       {
                                           required: true,
                                           message: "Report required.",
                                       },
                                   ]}>
                            <Select>
                                <Option value="Edit">Edit</Option>
                                <Option value="View">View</Option>
                                <Option value="None">None</Option>
                            </Select>
                        </Form.Item>
                    </div>
                </div>
                <div className="col-md-6" style={{paddingTop: '10px', paddingBottom: '10px'}}>
                    <div className="d-flex">
                        <p className="m-0 pr-2 pt-1" style={{width: '200px'}}>Recommendation</p>
                        <Form.Item name="recommendation"
                                   rules={[
                                       {
                                           required: true,
                                           message: "Recommendation required.",
                                       },
                                   ]}>
                            <Select>
                                <Option value="Edit">Edit</Option>
                                <Option value="View">View</Option>
                                <Option value="None">None</Option>
                            </Select>
                        </Form.Item>
                    </div>
                </div>
                <div className="col-md-6" style={{paddingTop: '10px', paddingBottom: '10px'}}>
                    <div className="d-flex">
                        <p className="m-0 pr-2 pt-1" style={{width: '200px'}}>User management</p>
                        <Form.Item name="userManagement"
                                   rules={[
                                       {
                                           required: true,
                                           message: "User management required.",
                                       },
                                   ]}>
                            <Select>
                                <Option value="Edit">Edit</Option>
                                <Option value="View">View</Option>
                                <Option value="None">None</Option>
                            </Select>
                        </Form.Item>
                    </div>
                </div>
            </div>
        </Form>
    )
}