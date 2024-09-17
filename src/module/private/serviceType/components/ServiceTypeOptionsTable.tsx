import {notification, Table} from "antd";
import {Action, ActionType} from "../../../../shared/utils/entity/utility.model";
import {IOModal} from "../../../../shared/utils/Modal/Modal";
import {ServiceTypeOptionsUI} from "../entity/serviceType.model";
import {ColumnsType} from "antd/lib/table";
import {ReactComponent as EditIcon} from "../../../../shared/icons/edit-icon.svg";
import {ReactComponent as DeleteIcon} from "../../../../shared/icons/delete-icon.svg";
import EditOptionsModal from "./EditOptionsModal";
import {deleteOption} from "../services/service.service";
import PasswordContent from "../../componenets/PasswordModal/PasswordModal";
import {getUserRoles} from "../../../public/auth/services/auth.service";

export default function ServiceTypeOptionsTable(props: { data: any }) {
    const userRoles = getUserRoles()
    const onActionClick = (record: ServiceTypeOptionsUI, action: Action) => {
        function handleDelete() {
            deleteOption(record.id).then((response)=>{
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
        switch (action.type) {
            case ActionType.edit:
                IOModal.confirmForm({
                    title: 'Please enter option information',
                    okText: 'Edit',
                    cancelText: 'Close',
                    okType: 'default',
                    icon: undefined,
                    content: <EditOptionsModal data={record}/>,
                    okButtonProps: {form:'edit-option-form', htmlType: 'submit'},
                });
                break;
            case ActionType.delete:
                IOModal.confirm({
                    title: 'Та бүтээгдэхүүнийг устгахдаа итгэлтэй байна уу?',
                    okText: 'Зөвшөөрөх',
                    onOk: args => {
                        IOModal.confirmForm({
                            title: 'Нууц үгээ оруулан баталгаажуулна уу',
                            okText: 'Болсон',
                            icon: undefined,
                            content: <PasswordContent handleFunction={handleDelete}/>,
                            okButtonProps: {form:'password-confirmation-form', htmlType: 'submit'},
                        });
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

    const onAddClick = () => {
        IOModal.confirmForm({
            title: 'Please enter option information',
            okText: 'Add',
            icon: undefined,
            cancelText: 'Close',
            content: <EditOptionsModal/>,
            okButtonProps: {form:'edit-option-form', htmlType: 'submit'},
        });
    };

    let columns: ColumnsType<ServiceTypeOptionsUI> = [
        {
            title: '№',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Options',
            dataIndex: 'option',
            key: 'option'
        },
        {
            title: 'Value type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
        },
    ];
    if(userRoles.service === "edit"){
        columns = [
            {
                title: '№',
                dataIndex: 'index',
                key: 'index',
            },
            {
                title: 'Options',
                dataIndex: 'option',
                key: 'option'
            },
            {
                title: 'Value type',
                dataIndex: 'type',
                key: 'type',
            },
            {
                title: 'Value',
                dataIndex: 'value',
                key: 'value',
            },
            {
                title: "Action",
                dataIndex: "actions",
                key: "actions",
                align: "center",
                render: (actions: Action[], record) => (
                    <div className="list-icons">
                        {actions?.map((action) => (
                            <a className="list-icons-item" onClick={() => onActionClick(record, action)}>
                                {action.element}
                            </a>
                        ))}
                    </div>
                ),
            },

        ];
    }

    const serviceTypeOptionsUIs: ServiceTypeOptionsUI[] = props.data.map(
        (category: ServiceTypeOptionsUI, index: number) => {
            const actions: Action[] =[
                { icon: "icon-pencil7", element: <EditIcon />, type: ActionType.edit },
                { icon: "icon-trash", type: ActionType.delete, color: "#f45844", element: <DeleteIcon /> },
            ];
            return{
                ...category,
                actions: actions,
                index: index + 1,
                key: index,
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
            footer={() => {
                if (userRoles.service === "edit"){
                    return(<div onClick={() => onAddClick()}>+ Add new option</div>)
                }
            }}
        />
    )
}