import { Form, Input, Modal, notification, Switch  } from "antd";
import UploadImage from "../../../../shared/component/UploadImage/UploadImage";
import { OfficeUI } from "../entity/office.model";
import { useForm } from "antd/lib/form/Form";
import { uploadImage } from "../services/upload.service";
import { addOffice, editOffice } from "../services/office.service";
import { validations } from "../../../../shared/validation/validations";

export default function EditOfficeModal(props: { data?: OfficeUI | undefined }) {
    const [form] = useForm();
    console.log(props.data)

    const onFinish = (values: any) => {
        uploadImage(values.image).then((response) => {
            if (props.data === undefined) {
                uploadImage(values.pin_icon).then((icon) => {
                    if (icon.data.status_code === 320) {
                        addOffice(values, response.data.data.file_path).then((response) => {
                            if (response.data.status_code === 0) {
                                notification.success({
                                    message: response.data.error,
                                    description: response.data.message
                                })
                                window.location.reload();
                            } else {
                                notification.error({
                                    message: response.data.error,
                                    description: response.data.message
                                })
                            }
                        })
                    } else {
                        addOffice(values, response.data.data.file_path, icon.data.data.file_path).then((response) => {
                            if (response.data.status_code === 0) {
                                notification.success({
                                    message: response.data.error,
                                    description: response.data.message
                                })
                                window.location.reload();
                            } else {
                                notification.error({
                                    message: response.data.error,
                                    description: response.data.message
                                })
                            }
                        })
                    }

                })
            } else {
                if (response.data.status_code === 320) {
                    uploadImage(values.pin_icon).then((icon) => {
                        if (icon.data.status_code === 320) {
                            editOffice(values, props.data?.id, props.data?.image, props.data?.pin_icon).then((response) => {
                                if (response.data.status_code === 0) {
                                    notification.success({
                                        message: response.data.error,
                                        description: response.data.message
                                    })
                                    window.location.reload();
                                } else {
                                    notification.error({
                                        message: response.data.error,
                                        description: response.data.message
                                    })
                                }

                            })
                        } else {
                            editOffice(values, props.data?.id, props.data?.image, icon.data.data.file_path).then((response) => {
                                if (response.data.status_code === 0) {
                                    notification.success({
                                        message: response.data.error,
                                        description: response.data.message
                                    })
                                    window.location.reload();
                                } else {
                                    notification.error({
                                        message: response.data.error,
                                        description: response.data.message
                                    })
                                }

                            })
                        }
                    })
                } else {
                    uploadImage(values.pin_icon).then((icon) => {
                        if (icon.data.status_code === 320) {
                            editOffice(values, props.data?.id, response.data.data.file_path, props.data?.pin_icon).then((response) => {
                                if (response.data.status_code === 0) {
                                    notification.success({
                                        message: response.data.error,
                                        description: response.data.message
                                    })
                                    window.location.reload();
                                } else {
                                    notification.error({
                                        message: response.data.error,
                                        description: response.data.message
                                    })
                                }

                            })
                        } else {
                            editOffice(values, props.data?.id, response.data.data.file_path, icon.data.data.file_path).then((response) => {
                                if (response.data.status_code === 0) {
                                    notification.success({
                                        message: response.data.error,
                                        description: response.data.message
                                    })
                                    window.location.reload();
                                } else {
                                    notification.error({
                                        message: response.data.error,
                                        description: response.data.message
                                    })
                                }
                            })
                        }
                    })
                }
            }
        })
        Modal.destroyAll();
    };

    return (
        <Form name="edit-office-form" onFinish={onFinish} form={form}>
            <div className="row py-1">
                <div className="col-md-4">
                    <p>Office name:</p>
                </div>
                <div className="col-md-8">
                    <Form.Item name="name"
                        initialValue={props.data?.name}
                        rules={[
                            {
                                required: true,
                                message: "Office name required.",
                            }, ...validations.CHARMAXFIFTY
                        ]}>
                        <Input />
                    </Form.Item>
                </div>
            </div>
            <div className="row py-1">
                <div className="col-md-4">
                    <p>Location:</p>
                </div>
                <div className="col-md-8">
                    <div className="row">
                        <div className="col-md-12">
                            <Form.Item name="longitude"
                                initialValue={props.data?.location.longitude}
                                rules={[
                                    {
                                        required: true,
                                        message: "Longitude required.",
                                    },
                                ]}>
                                <Input placeholder="Longitude" />
                            </Form.Item>
                        </div>
                        <div className="col-md-12 pt-2">
                            <Form.Item name="latitude"
                                initialValue={props.data?.location.latitude}
                                rules={[
                                    {
                                        required: true,
                                        message: "Latitude required.",
                                    },
                                ]}>
                                <Input placeholder="Latitude" />
                            </Form.Item>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row py-1">
                <div className="col-md-4">
                    <p>Photo:</p>
                </div>
                <div className="col-md-8">
                    {
                        props.data === undefined ?
                            <Form.Item name="image"
                                rules={[
                                    {
                                        required: true,
                                        message: "Image required.",
                                    },
                                ]}>
                                <UploadImage />
                            </Form.Item>
                            :
                            <Form.Item name="image">
                                <UploadImage image={props.data?.image} type="image" />
                            </Form.Item>
                    }
                </div>
            </div>
            <div className="row py-1">
                <div className="col-md-4">
                    <p>Pin Icon:</p>
                </div>
                <div className="col-md-8">
                    {
                        props.data === undefined ?
                            <Form.Item name="pin_icon"
                            >
                                <UploadImage />
                            </Form.Item>
                            :
                            <Form.Item name="pin_icon">
                                <UploadImage image={props.data?.pin_icon} type="image" />
                            </Form.Item>
                    }
                </div>
            </div>
            <div className="row py-1">
                <div className="col-md-4">
                    <p>Number of storey:</p>
                </div>
                <div className="col-md-8">
                    <div className="col-md-12 pt-2">
                        <Form.Item name="floors"
                            initialValue={props.data?.floors}
                            rules={[
                                {
                                    required: true,
                                    message: "Number of storeys required.",
                                },
                            ]}>
                            <Input />
                        </Form.Item>
                    </div>
                </div>
            </div>
            <div className="row py-1">
                <div className="col-md-4">
                    <p>Arena:</p>
                </div>
                <div className="col-md-8">
                    <div className="col-md-12">
                        <Form.Item name="is_arena"
                                   valuePropName="checked"
                                   initialValue={props.data?.is_arena}
                                   rules={[
                                   ]}>
                            <Switch />
                        </Form.Item>
                    </div>
                </div>
            </div>
        </Form>
    )
}
