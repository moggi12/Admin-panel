import {ColumnsType} from "antd/lib/table";
import {notification, Table} from "antd";
import {UserUI} from "../entity/user.model";
import {IOModal} from "../../../../shared/utils/Modal/Modal";
import {Action, ActionType} from "../../../../shared/utils/entity/utility.model";
import {ReactComponent as EditIcon} from "../../../../shared/icons/edit-icon.svg";
import {ReactComponent as DeleteIcon} from "../../../../shared/icons/delete-icon.svg";
import EditUserModal from "./EditUserModal";
import {deleteUser} from "../services/user.service";
import PasswordContent from "../../componenets/PasswordModal/PasswordModal";
import {getUserRoles} from "../../../public/auth/services/auth.service";

export default function UserListTable(props: { data: any }) {
    const userRoles = getUserRoles()
    const onActionClick = (data: UserUI, action: Action) => {
        function handleDelete() {
            deleteUser(data.id).then((response)=>{
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
                    title: 'Edit User',
                    okText: 'Edit',
                    content: <EditUserModal data={data}/>,
                    icon: undefined,
                    cancelText: 'Close',
                    okButtonProps: {form:'edit-user-form', htmlType: 'submit'},
                });
                break;
            case ActionType.delete:
                IOModal.confirm({
                    title: 'Та уг хэрэглэгчийг хасахдаа итгэлтэй байна уу?',
                    okText: 'Тийм',
                    content: <div className="text-center">Тийм дарснаар тухайн хэрэглэгч админ панелд нэвтрэх эрхгүй болно</div>,
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

    let columns: ColumnsType<UserUI> = [
        {
            title: '№',
            dataIndex: 'key',
            key: 'key'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'key',
        },
    ];

    if (userRoles.userManagement === "edit"){
        columns = [
            {
                title: '№',
                dataIndex: 'key',
                key: 'key'
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email'
            },
            {
                title: 'Role',
                dataIndex: 'role',
                key: 'key',
            },
            {
                title: "Action",
                dataIndex: "actions",
                key: "actions",
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
    const tableDataSourceUIs: UserUI[] = props.data.map(
        (data: UserUI, index: number) => {
            const actions: Action[] =[
                { icon: "icon-pencil7", element: <EditIcon />, type: ActionType.edit },
                { icon: "icon-trash", type: ActionType.delete, color: "#f45844", element: <DeleteIcon /> },
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
            dataSource={tableDataSourceUIs}
            className="table table-responsive"
            pagination={{hideOnSinglePage: true}}
            rowClassName="table-row"
        />
    )
}