import {ColumnsType} from "antd/lib/table";
import {notification, Table} from "antd";
import {IOModal} from "../../../../shared/utils/Modal/Modal";
import {Action, ActionType} from "../../../../shared/utils/entity/utility.model";
import {ReactComponent as DeleteIcon} from "../../../../shared/icons/delete-icon.svg";
import {AccessType} from "../../userManagement/entity/user.model";
import {RolesUI} from "../entity/roles.model";
import AddRolesModal from "./AddRolesModal";
import {deleteRole} from "../services/role.service";
import PasswordContent from "../../componenets/PasswordModal/PasswordModal";
import { getUserRoles } from "../../../public/auth/services/auth.service";


export default function RolesListTable(props: { data: any }) {
    const userRoles = getUserRoles()
    const onActionClick = (data: RolesUI, action: Action) => {

        function handleDelete() {
            deleteRole(data.id).then((response)=>{
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
            case ActionType.delete:
                IOModal.confirm({
                    title: 'Та уг хэрэглэгчийг хасахдаа итгэлтэй байна уу?',
                    okText: 'Тийм',
                    content: 'Тийм дарснаар тухайн хэрэглэгч админ панелд\n' +
                        'нэвтрэх эрхгүй болно',
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
            default:
                break;
        }
    };

    const onClickAccessType = (data: RolesUI) => {
        IOModal.confirmForm({
            title: 'Access type',
            content: <div><AddRolesModal data={data}/></div>,
            width: '700px',
            okText: 'Edit',
            icon: undefined,
            cancelText: 'Close',
            okButtonProps: {form:'add-role-form', htmlType: 'submit'},
        });
    }

    let columns: ColumnsType<RolesUI> = [
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
            title: 'Access type',
            dataIndex: 'accessType',
            key: 'key',
            render: (accessType: AccessType, record) => (
                <a style={{color: '#ffc800'}} onClick={()=>onClickAccessType(record)}>View</a>
            )
        },
    ];
    if(userRoles.roles === "edit"){
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
                title: 'Access type',
                dataIndex: 'accessType',
                key: 'key',
                render: (accessType: AccessType, record) => (
                    <a style={{color: '#ffc800'}} onClick={()=>onClickAccessType(record)}>View</a>
                )
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
        ]
    }
    
    const tableDataSourceUIs: RolesUI[] = props.data.map(
        (data: RolesUI, index: number) => {
            const actions: Action[] =[
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