import {EmployeeListUI} from "../entity/merchant.model";
import {Action, ActionType} from "../../../../shared/utils/entity/utility.model";
import {IOModal} from "../../../../shared/utils/Modal/Modal";
import {ColumnsType} from "antd/lib/table";
import {notification, Table} from "antd";
import {ReactComponent as DeleteIcon} from "../../../../shared/icons/delete-icon.svg";
import {approveDataMerchantEmployee, deleteMerchantEmployee} from "../services/merchant.service";
import PasswordContent from "../../componenets/PasswordModal/PasswordModal";
import {getUserRoles} from "../../../public/auth/services/auth.service";
import {ReactComponent as EditIcon} from "../../../../shared/icons/edit-icon.svg";

export default function EmployeeListTable(props: { data: any, merchantId: any }) {
    const userRoles = getUserRoles()
    const onActionClick = (data: EmployeeListUI, action: Action) => {
        function handleDelete() {
            deleteMerchantEmployee(props.merchantId, data.id).then((response)=>{
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
        function handleApproveData() {
            approveDataMerchantEmployee(props.merchantId, data.id).then((response)=>{
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
                IOModal.confirm({
                    title: 'Та уг хэрэглэгчийг data approve хийх гэж байна.',
                    icon: undefined,
                    okText: 'Тийм',
                    onOk: args => {
                        handleApproveData()
                    }
                });
                break;
            case ActionType.delete:
                IOModal.confirm({
                    title: 'Та уг хэрэглэгчийг устгахад \n' +
                        'итгэлтэй байна уу?',
                    icon: undefined,
                    okText: 'Тийм',
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


    let columns: ColumnsType<EmployeeListUI> = [
        {
            title: 'Нэр',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Ажилтны төрөл',
            dataIndex: 'type',
            key: 'type',
            render: (type: string[]) => (
                <>{type.map((name)=>(<>{name} </>))}</>
            )
        },
        {
            title: 'Утасны дугаар',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            key: 'email',
        },
    ];

    if (userRoles.merchant === "edit"){
        columns = [
            {
                title: 'Нэр',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'Ажилтны төрөл',
                dataIndex: 'type',
                key: 'type',
                render: (type: string[]) => (
                    <>{type.map((name)=>(<>{name} </>))}</>
                )
            },
            {
                title: 'Утасны дугаар',
                dataIndex: 'phoneNumber',
                key: 'phoneNumber',
            },
            {
                title: 'E-mail',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: "Action",
                dataIndex: "actions",
                key: "actions",
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
        ];
    }
    const serviceTypeOptionsUIs: EmployeeListUI[] = props.data.map(
        (data: EmployeeListUI, index: number) => {
            let actions: Action[]
            if (data.dataApproved){
                actions =[
                    { icon: "icon-trash", type: ActionType.delete, color: "#f45844", element: <DeleteIcon /> },
                ];
            } else if (!data.type.includes('toki')){
                actions =[
                    { icon: "icon-trash", type: ActionType.edit, color: "#f45844", element: <EditIcon /> },
                    { icon: "icon-trash", type: ActionType.delete, color: "#f45844", element: <DeleteIcon /> },
                ];
            } else {
                actions =[
                    { icon: "icon-trash", type: ActionType.delete, color: "#f45844", element: <DeleteIcon /> },
                ];
            }

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
