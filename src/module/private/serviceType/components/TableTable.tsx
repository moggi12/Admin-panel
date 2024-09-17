import {TableUI} from "../entity/serviceType.model";
import {Action, ActionType} from "../../../../shared/utils/entity/utility.model";
import {IOModal} from "../../../../shared/utils/Modal/Modal";
import {ColumnsType} from "antd/lib/table";
import {ReactComponent as EditIcon} from "../../../../shared/icons/edit-icon.svg";
import {notification, Table} from "antd";
import EditTableModal from "./EditTableModal";
import {ReactComponent as ShowIcon} from "../../../../icons/show.svg";
import {ReactComponent as HideIcon} from "../../../../icons/hide.svg";
import {tableHide, tableShow} from "../services/service.service";
import PasswordContent from "../../componenets/PasswordModal/PasswordModal";
import {getUserRoles} from "../../../public/auth/services/auth.service";

export default function TableTable(props: { data: any }) {
    const userRoles = getUserRoles()
    const onActionClick = (data: TableUI, action: Action) => {
        switch (action.type) {
            case ActionType.edit:
                IOModal.confirmForm({
                    title: 'Please edit the field',
                    okText: 'Edit',
                    cancelText: 'Close',
                    icon: undefined,
                    content: <EditTableModal data={data}/>,
                    okButtonProps: {form:'edit-table-form', htmlType: 'submit'},
                });
                break;
            default:
                break;
        }
    };

    const onShow = (data: any) => {
        function handleShow() {
            tableShow(data.key, data.name).then((response)=>{
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
        IOModal.confirm({
            title: 'Та уг баганыг нээхдээ итгэлтэй байна уу?',
            okText: 'Тийм',
            icon: null,
            content: "Тийм дарснаар тухайн багана бүх бизнесийн\n" +
                "хүснэгтэд харагдах болно",
            onOk: args => {
                IOModal.confirmForm({
                    title: 'Нууц үгээ оруулан баталгаажуулна уу',
                    okText: 'Болсон',
                    icon: undefined,
                    content: <PasswordContent handleFunction={handleShow}/>,
                    okButtonProps: {form:'password-confirmation-form', htmlType: 'submit'},
                });
            }

        });
    }

    const onHide = (data: any) => {
        function handleHide() {
            tableHide(data.key, data.name).then((response)=>{
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
        IOModal.confirm({
            title: 'Та уг баганыг нуухдаа итгэлтэй байна уу?',
            okText: 'Тийм',
            icon: null,
            content: "Тийм дарснаар тухайн багана бүх бизнесийн\n" +
                "хүснэгтэд харагдахгүй болно",
            onOk: args => {
                IOModal.confirmForm({
                    title: 'Нууц үгээ оруулан баталгаажуулна уу',
                    okText: 'Болсон',
                    icon: undefined,
                    content: <PasswordContent handleFunction={handleHide}/>,
                    okButtonProps: {form:'password-confirmation-form', htmlType: 'submit'},
                });
            }

        });
    }


    let columns: ColumnsType<TableUI> = [
        {
            title: '№',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Column name',
            dataIndex: 'name',
            key: 'name'
        }
    ];

    if(userRoles.service === "edit"){
        columns = [
            {
                title: '№',
                dataIndex: 'index',
                key: 'index',
            },
            {
                title: 'Column name',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: "Action",
                dataIndex: "actions",
                key: "actions",
                align: "center",
                render: (actions: Action[], record) => (
                    <div className="list-icons">
                        {actions?.map((action) => (
                            <a href="#" className="list-icons-item" onClick={() => onActionClick(record, action)}>
                                {action.element}
                            </a>
                        ))}
                    </div>
                ),
            },
            {
                title: "Show",
                dataIndex: "isShow",
                key: "isShow",
                align: "center",
                render: (isShow: boolean, record) => (
                    <div className="list-icons">
                        {isShow ? <ShowIcon style={{fontSize: '20px', color: '#6bac21'}} onClick={()=>onHide(record)} />
                            :
                            <HideIcon style={{fontSize: '20px', color: '#f45844'}} onClick={()=>onShow(record)} />}
                    </div>
                ),
            },
        ];
    }
    const serviceTypeCategoriesUIs: TableUI[] = props.data.map(
        (data: TableUI, index: number) => {
            const actions: Action[] =[
                { icon: "icon-pencil7", element: <EditIcon />, type: ActionType.edit },
            ];
            return{
                ...data,
                actions: actions,
                index: index + 1,
            }
        }
    )

    return(
        <Table
            columns={columns}
            dataSource={serviceTypeCategoriesUIs}
            className="table table-responsive"
            pagination={{hideOnSinglePage: true}}
            rowClassName="table-row"
        />
    )
}