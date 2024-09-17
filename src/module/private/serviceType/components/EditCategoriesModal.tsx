import {Form, Input, Modal, notification} from "antd";
import UploadImage from "../../../../shared/component/UploadImage/UploadImage";
import { Checkbox } from 'antd';
import {useForm} from "antd/lib/form/Form";
import {ServiceTypeCategoriesUI, ServiceTypeOptionsUI} from "../entity/serviceType.model";
import {useEffect, useState} from "react";
import {addCategory, editCategory, getOptions} from "../services/service.service";
import {uploadImage} from "../../office/services/upload.service";
import {validations} from "../../../../shared/validation/validations";


export default function EditCategoriesModal(props: {data?: ServiceTypeCategoriesUI|undefined}) {
    const [form] = useForm();
    const [options, setOptions] = useState<ServiceTypeOptionsUI[]>([])

    const onFinish = (values: any) => {
        let name = values.name;
        let uploadedImage = values.image;
        delete values.image
        delete values.name;
        Object.keys(values).forEach(k => (values[k] === false) && delete values[k])
        let applicable_options = Object.keys(values)

        uploadImage(uploadedImage).then((response)=>{
            if (props.data === undefined){
                let image = response.data.data.file_path;
                addCategory(name, image, applicable_options).then((response)=>{
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
            } else{
                if(response.data.data === undefined){
                    editCategory(name, props.data.image, applicable_options, props.data.id).then((response)=>{
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
                } else{
                    editCategory(name, response.data.data.file_path, applicable_options, props.data.id).then((response)=>{
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

            }
        })
        Modal.destroyAll();
    };

    useEffect(()=>{
        getOptions().then((response)=>{
            let optionData = response.data.data.map((value:any)=>{
                return{
                    id: value._id,
                    option: value.name,
                }
            })
            setOptions(optionData)
        })

    }, [])

    return (
        <>
            {props.data === undefined ? <Form name="edit-category-form" onFinish={onFinish} form={form}>
                    <div className="row py-1">
                        <div className="col-md-4">
                            <p>Category name:</p>
                        </div>
                        <div className="col-md-8">
                            <Form.Item name="name" rules={[
                                {
                                    required: true,
                                    message: "Category name required.",
                                }, ...validations.CHARMAXFIFTY
                            ]}>
                                <Input/>
                            </Form.Item>
                        </div>
                    </div>
                    <div className="row py-1">
                        <div className="col-md-4">
                            <p>Photo:</p>
                        </div>
                        <div className="col-md-8">
                            <Form.Item name="image" rules={[
                                {
                                    required: true,
                                    message: "Image required.",
                                },
                            ]}>
                                <UploadImage/>
                            </Form.Item>
                        </div>
                    </div>
                    <div className="row py-1">
                        <div className="col-md-12">
                            <p>Options:</p>
                        </div>
                        {options.map((data)=>{
                            return(
                                <div className="col-md-12 py-1">
                                    <Form.Item name={data.id} valuePropName="checked">
                                        <Checkbox>{data.option}</Checkbox>
                                    </Form.Item>
                                </div>
                            )
                        })
                        }
                    </div>
                </Form>
                :
                <Form name="edit-category-form" onFinish={onFinish} form={form}>
                    <div className="row py-1">
                        <div className="col-md-4">
                            <p>Category name:</p>
                        </div>
                        <div className="col-md-8">
                            <Form.Item name="name"
                                       initialValue={props.data.category}
                                       rules={[
                                {
                                    required: true,
                                    message: "Category name required.",
                                }, ...validations.CHARMAXFIFTY,
                            ]}>
                                <Input/>
                            </Form.Item>
                        </div>
                    </div>
                    <div className="row py-1">
                        <div className="col-md-4">
                            <p>Photo:</p>
                        </div>
                        <div className="col-md-8">
                            {
                                props.data === undefined ?
                                    <Form.Item name="image" rules={[
                                        {
                                            required: true,
                                            message: "Image required.",
                                        },
                                    ]}>
                                        <UploadImage/>
                                    </Form.Item> :
                                    <Form.Item name="image">
                                        <UploadImage image={props.data?.image}/>
                                    </Form.Item>
                            }
                        </div>
                    </div>
                    <div className="row py-1">
                        <div className="col-md-12">
                            <p>Options:</p>
                        </div>

                        {options.map((data)=>{
                            let isChecked = false;
                            props.data?.options.forEach((option)=>{
                                if (data.id === option._id){
                                    isChecked = true
                                }
                            })
                            return(
                                <div className="col-md-12 py-1" key={data.id}>
                                    <Form.Item name={data.id} valuePropName="checked" initialValue={isChecked}>
                                        <Checkbox>{data.option}</Checkbox>
                                    </Form.Item>
                                </div>
                            )
                        })
                        }
                    </div>
                </Form>
            }
        </>


    )
}