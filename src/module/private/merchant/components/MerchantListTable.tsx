import {Action, ActionType} from "../../../../shared/utils/entity/utility.model";
import {IOModal} from "../../../../shared/utils/Modal/Modal";
import {ColumnsType} from "antd/lib/table";
import {Form, Input, Modal, notification, Space, Table} from "antd";
import {MerchantUI} from "../entity/merchant.model";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {approveMerchant, declineMerchant} from "../services/merchant.service";
import PasswordContent from "../../componenets/PasswordModal/PasswordModal";
import {useForm} from "antd/lib/form/Form";
import {getUserRoles} from "../../../public/auth/services/auth.service";

export default function MerchantListTable(props: { data: any, state: any, setState: any }) {
    let { sortedInfo } = props.state;
    const userRoles = getUserRoles()
    const [form] = useForm();

    const onActionClick = (data: MerchantUI, action: Action) => {

        function onFinish(values:any) {
            let reason = values.reason
            IOModal.confirmForm({
                title: 'Нууц үгээ оруулан баталгаажуулна уу',
                okText: 'Болсон',
                icon: undefined,
                content: <PasswordContent handleFunction={()=>DeclineMerchant(reason)}/>,
                okButtonProps: {form:'password-confirmation-form', htmlType: 'submit'},
            });
        }

        function ApproveMerchant() {
            approveMerchant(data.id).then((response)=>{
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
        function DeclineMerchant(reason: string) {
            declineMerchant(data.id,reason).then((response)=>{
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

        const onDeleteAcceptShowResponseModal = () => {
            IOModal.confirmForm({
                title: 'Хүсэлтийг цуцалж буй шалтгаан оруулна уу',
                okText: 'Болсон',
                content:
                <Form name="decline-reason-form" onFinish={onFinish} form={form}>
                    <div className="row mt-3">
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-4">
                                    Шалтгаан:
                                </div>
                                <div className="col-md-8">
                                    <Form.Item name="reason">
                                        <Input />
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>,
                okButtonProps: {form:'decline-reason-form', htmlType: 'submit'},
            });
        }

        switch (action.type) {
            case ActionType.edit:
                IOModal.confirm({
                    title: 'Та уг мерчантын хүсэлтийг зөвшөөрөхдөө \n' +
                        'итгэлтэй байна уу?',
                    okText: 'Тийм ',
                    icon: undefined,
                    content: <div className="text-center">Тийм дарснаар уг мерчант хэрэглэгчдэд харагдаж эхлэх болно</div>,
                    onOk: args => {
                        ApproveMerchant();
                        Modal.destroyAll();
                        window.location.reload()
                    }
                });
                break;
            case ActionType.delete:
                IOModal.confirm({
                    title: 'Та уг мерчантын цуцлахад   \n' +
                        'итгэлтэй байна уу?',
                    okText: 'Тийм',
                    icon: undefined,
                    onOk: args => {
                        onDeleteAcceptShowResponseModal()
                    }
                });
                break;
            case ActionType.hide:
                IOModal.confirm({
                    title: 'Та бүтээгдэхүүнийг нуухдаа итгэлтэй байна уу?',
                    okText: 'Зөвшөөрөх'
                });
                break;
            default:
                break;
        }
    };

    const onOfficeListClick = (data: MerchantUI) => {
        IOModal.showOnly({
            title: 'Office List',
            content: <>{data.officeList.map((office) => (<>{office.name}<br/></>))}</>
        });
    }
    const onColorCodeClick = (data: MerchantUI) => {
        IOModal.confirm({
            title: 'Color Code',
            content: <>{data.colorCode}</>
        });
    }

    const columns: ColumnsType<MerchantUI> = [
        {
            title: '№',
            dataIndex: 'key',
            key: 'key',
            sorter: (a, b) => a.index- b.index,
            sortOrder: sortedInfo.columnKey === 'index' && sortedInfo.order,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
            render: (text: string, record) => {
                let state;
                if (record.blocked){
                    if (userRoles.merchant === "edit"){
                        state = {
                            headerTitle: "Merchant > " +
                                record.name,
                            headerButton: "Unblock Merchant",
                            clickFunctionProps: {
                                title: 'Та уг мерчантыг анблок хийхдээ итгэлтэй байна уу?',
                                okText: 'Тийм',
                                content: 'Тийм дарснаар тус мерчант нь апп дээр\n' +
                                    'харагдах болно',
                            },
                            merchantId: record.id
                        }
                    } else{
                        state = {
                            headerTitle: "Merchant > " +
                                record.name,
                            headerButton: null,
                            clickFunctionProps: {
                                title: 'Та уг мерчантыг анблок хийхдээ итгэлтэй байна уу?',
                                okText: 'Тийм',
                                content: 'Тийм дарснаар тус мерчант нь апп дээр\n' +
                                    'харагдах болно',
                            },
                            merchantId: record.id
                        }
                    }
                }else{
                    if (userRoles.merchant === "edit"){
                        state = {
                            headerTitle: "Merchant > " +
                                record.name,
                            headerButton: "Block Merchant",
                            clickFunctionProps: {
                                title: 'Та уг мерчантыг блок хийхдээ итгэлтэй байна уу?',
                                okText: 'Тийм',
                                content: 'Тийм дарснаар тус мерчант нь апп дээр\n' +
                                    'харагдахгүй болно',
                            },
                            merchantId: record.id
                        }
                    } else{
                        state = {
                            headerTitle: "Merchant > " +
                                record.name,
                            headerButton: null,
                            clickFunctionProps: {
                                title: 'Та уг мерчантыг блок хийхдээ итгэлтэй байна уу?',
                                okText: 'Тийм',
                                content: 'Тийм дарснаар тус мерчант нь апп дээр\n' +
                                    'харагдахгүй болно',
                            },
                            merchantId: record.id
                        }
                    }

                }
                if (record.active === true){
                    return (
                        <Link to={"/merchant/" + record.id + "/info"} state={state} style={{color: '#ffc800'}}>{text}</Link>
                    )
                } else {
                    return(
                        <>{text}</>
                    )
                }
            },
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
            sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order,
        },
        {
            title: 'Service type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Menu',
            dataIndex: 'key',
            key: 'key',
            render: (key:number, record) => (
                <Link to={"/merchant/" + record.id + "/info"} state={{
                    headerTitle: "Merchant > " +
                        record.name,
                    headerButton: "Block Merchant",
                    merchantEditKey: "2",
                    clickFunctionProps: {
                        title: 'Та уг мерчантыг блок хийхдээ итгэлтэй байна уу?',
                        okText: 'Тийм',
                        content: 'Тийм дарснаар тус мерчант нь апп дээр\n' +
                            'харагдахгүй болно'
                    },
                    merchantId: record.id
                }} style={{color: '#ffc800'}}>View</Link>
            )
        },
        {
            title: 'Office list',
            dataIndex: 'key',
            key: 'key',
            render: (key: number, record) => (
                <a style={{color: '#ffc800'}} onClick={()=>onOfficeListClick(record)}>View</a>
            )
        },
        {
            title: 'Color code',
            dataIndex: 'key',
            key: 'key',
            render: (key: number, record) => (
                <a style={{color: '#ffc800'}} onClick={()=>onColorCodeClick(record)}>View</a>
            )
        },
        {
            title: 'Toki SPOC',
            dataIndex: 'spoc',
            key: 'spoc',
            sorter: (a, b) => a.spoc.localeCompare(b.spoc),
            sortOrder: sortedInfo.columnKey === 'spoc' && sortedInfo.order,
        },
        {
            title: "Action",
            dataIndex: "actions",
            key: "actions",
            sorter: (a, b) => Number(a.active) - Number(b.active),
            sortOrder: sortedInfo.columnKey === 'actions' && sortedInfo.order,
            render: (actions: Action[], record) => {
                if (record.active === true){
                    return (
                        <CheckOutlined style={{fontSize: '20px', color: '#6bac21'}} />
                    )
                } else {
                    return(
                        <Space size="middle">
                            {actions?.map((action) => (
                                <a className="list-icons-item" onClick={() => onActionClick(record, action)}>
                                    {action.element}
                                </a>
                            ))}
                        </Space>
                    )
                }
            },
        },

    ];
    const serviceTypeOptionsUIs: MerchantUI[] = props.data.map(
        (data: MerchantUI, index: number) => {
            const actions: Action[] =[
                { icon: "icon-pencil7", element: <CheckOutlined style={{fontSize: '20px', color: '#6bac21'}} />, type: ActionType.edit },
                { icon: "icon-trash", type: ActionType.delete, color: "#f45844", element: <CloseOutlined style={{fontSize: '20px', color: '#f45844'}} /> },
            ];
            return{
                ...data,
                actions: actions,
                key: index+1,
                index: index
            }
        }
    )

    return(
        <Table
            columns={columns}
            dataSource={serviceTypeOptionsUIs}
            className="table table-responsive"
            pagination={{hideOnSinglePage: true}}
            rowClassName="table-row"
        />
    )
}