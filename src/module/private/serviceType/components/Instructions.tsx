import {Button, Collapse, Form, Input, Modal, notification, Select, Tabs} from "antd";
import {InstructionsStyle} from './InstructionsStyle'
import {addOffice, deleteOffice, editOffice} from "../../office/services/office.service";
import {IOModal} from "../../../../shared/utils/Modal/Modal";
import {ReactComponent as EditIcon} from "../../../../shared/icons/edit-icon.svg";
import {ReactComponent as DeleteIcon} from "../../../../shared/icons/delete-icon.svg";
import {useEffect, useState} from "react";
import {addInstruction, deleteInstruction, editInstruction, getInstruction} from "../services/service.service";
import {useForm} from "antd/lib/form/Form";
import {uploadImage} from "../../office/services/upload.service";
import UploadImage from "../../../../shared/component/UploadImage/UploadImage";
import ReactPlayer from 'react-player'
import PasswordContent from "../../componenets/PasswordModal/PasswordModal";

const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Option } = Select;

const onEditClick = (data: any) => {
    console.log(data)
    IOModal.confirmForm({
        title: 'Please enter instruction information.',
        okText: 'Edit',
        icon: undefined,
        cancelText: 'Close',
        content: <EditModal data={data}/>,
        okButtonProps: {form:'edit-instruction-form', htmlType: 'submit'},
    });
}

const onAddClick = () => {
    IOModal.confirmForm({
        title: 'Please enter instruction information.',
        okText: 'Add',
        icon: undefined,
        cancelText: 'Close',
        content: <EditModal/>,
        okButtonProps: {form:'edit-instruction-form', htmlType: 'submit'},
    });
}

function handleDeleteOffice(data: any) {
    deleteInstruction(data._id).then((response)=>{
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

const onDeleteClick = (data: any) => {
    IOModal.confirm({
        title: 'Та бүтээгдэхүүнийг устгахдаа итгэлтэй байна уу?',
        okText: 'Зөвшөөрөх',
        icon: undefined,
        onOk: args => {
            IOModal.confirmForm({
                title: 'Нууц үгээ оруулан баталгаажуулна уу',
                okText: 'Болсон',
                icon: undefined,
                content: <PasswordContent handleFunction={() =>handleDeleteOffice(data)}/>,
                okButtonProps: {form:'password-confirmation-form', htmlType: 'submit'},
            });
        }
    });
}

const AccordionHeader = (props: any) => {

    return (
        <div className="row" style={{width: '100%'}}>
            <div className="col-md-3">
                <h3>{props.data?.question}</h3>
            </div>
            <div className="col-md-6">

            </div>
            <div className="col-md-3 d-flex justify-content-end" onClick={e => e.stopPropagation()}>
                <EditIcon onClick={() => onEditClick(props.data)}/>
                <DeleteIcon style={{marginLeft: '10px', marginRight: '10px'}} onClick={()=>onDeleteClick(props.data)}/>
            </div>
        </div>
    )

}

const AccordionHeaderAdd = (props: any) => {

    return (
        <div className="row" style={{width: '100%', padding: '12px 16px'}} onClick={e => {
            e.stopPropagation();
            onAddClick()
        }}>
            <div className="col-md-12 text-center">
                <h3>Add new guide</h3>
            </div>
        </div>
    )

}

const InstructionBodyVideo = () =>{
    const [videos, setVideos] = useState<any>([])

    useEffect(()=>{
        getInstruction('video').then((res)=>{
            console.log(res)
            setVideos(res.data.data)
        })
    },[])
    return(
        <Collapse>
            <Panel header={<AccordionHeaderAdd />} key={0} showArrow={false}>
            </Panel>
            {
                videos.map((video: any, index: number)=>{
                    return(
                    <Panel header={<AccordionHeader data={video}/>} key={index+1}>
                        <ReactPlayer url={video.answer} controls />
                    </Panel>
                )})
            }
        </Collapse>
    )
}

const EditModal = (props: any) => {
    const [type, setType] = useState<string>("text")
    const [form] = useForm();
    console.log(props.data)

    useEffect(()=>{
        if(props.data !== undefined){
            setType(props.data.type)
        }
    },[])

    const onFinish = (values: any) => {
        if (values.type === "video") {
            uploadImage(values.answer).then((response) => {
                if (props.data === undefined) {
                    addInstruction(values.question, response.data.data.file_path, values.type).then((response) => {
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
                    if (response.data.status_code === 320) {
                        editInstruction(values.question, values.answer, values.type, props.data._id)
                            .then((response) => {
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
                        editInstruction(values.question, response.data.data.file_path, values.type, props.data._id).then((response) => {
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
                }
            })
        } else {
            if (props.data === undefined) {
                addInstruction(values.question, values.answer, values.type).then((response) => {
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
            } else{
                editInstruction(values.question, values.answer, values.type, props.data._id)
                    .then((response) => {
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
        }
        Modal.destroyAll();
    };
    return(
        <Form name="edit-instruction-form" onFinish={onFinish} form={form} initialValues={props?.data}>
            <div className="row py-1">
                <div className="col-md-4">
                    <p>Question:</p>
                </div>
                <div className="col-md-8">
                    <Form.Item name="question"
                               rules={[
                                   {
                                       required: true,
                                       message: "Question required.",
                                   },
                               ]}>
                        <Input/>
                    </Form.Item>
                </div>
            </div>
            <div className="row py-1">
                <div className="col-md-4">
                    <p>Type:</p>
                </div>
                <div className="col-md-8">
                    <Form.Item name="type"
                               rules={[
                                   {
                                       required: true,
                                       message: "Type required.",
                                   },
                               ]}>
                        <Select placeholder="Select" onChange={(val: any)=> setType(val)}>
                            <Option value="text">Text</Option>
                            <Option value="video">Video</Option>
                        </Select>
                    </Form.Item>
                </div>
            </div>
            {
                type === "text" ?
                    <div className="row py-1">
                        <div className="col-md-4">
                            <p>Answer:</p>
                        </div>
                        <div className="col-md-8">
                            <Form.Item name="answer"
                                       rules={[
                                           {
                                               required: true,
                                               message: "Answer required.",
                                           },
                                       ]}>
                                <Input/>
                            </Form.Item>
                        </div>
                    </div>
                    :
                    <div className="row py-1">
                        <div className="col-md-4">
                            <p>Answer:</p>
                        </div>
                        <div className="col-md-8">
                            {
                                props.data === undefined ?
                                    <Form.Item name="answer"
                                               rules={[
                                                   {
                                                       required: true,
                                                       message: "Answer required.",
                                                   },
                                               ]}>
                                        <UploadImage/>
                                    </Form.Item>
                                    :
                                    <Form.Item
                                        name="answer"
                                    >
                                        <UploadImage image={props.data?.answer} type={"video"}/>
                                    </Form.Item>
                            }
                        </div>
                    </div>
            }

        </Form>
    )
}

const InstructionBodyText = () =>{
    const [texts, setTexts] = useState<any>([])

    useEffect(()=>{
        getInstruction('text').then((res)=>{
            console.log(res)
            setTexts(res.data.data)
        })
    },[])
    return(
        <Collapse>
            <Panel header={<AccordionHeaderAdd />} key={0} showArrow={false}>
            </Panel>
            {
                texts.map((text: any, index:number)=>{
                    return(
                        <Panel header={<AccordionHeader data={text}/>} key={index+1}>
                            {text.answer}
                        </Panel>
                    )})
            }
        </Collapse>
    )
}
export default function Instructions() {

    return(
        <InstructionsStyle>
                    <Tabs defaultActiveKey={"1"} size="small">
                        <TabPane tab="Guide" key="1">
                            <InstructionBodyVideo/>
                        </TabPane>
                        <TabPane tab="FAQ" key="2">
                            <InstructionBodyText/>
                        </TabPane>
                    </Tabs>
        </InstructionsStyle>
    )
}