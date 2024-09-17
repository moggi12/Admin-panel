import {notification, Table} from "antd";
import {Action, ActionType} from "../../../../shared/utils/entity/utility.model";
import {IOModal} from "../../../../shared/utils/Modal/Modal";
import {ServiceTypeCategoriesUI} from "../entity/serviceType.model";
import {ColumnsType} from "antd/lib/table";
import {ReactComponent as EditIcon} from "../../../../shared/icons/edit-icon.svg";
import {ReactComponent as DeleteIcon} from "../../../../shared/icons/delete-icon.svg";
import '../../../private/componenets/css/Table.css'
import EditCategoriesModal from "./EditCategoriesModal";
import PasswordContent from "../../componenets/PasswordModal/PasswordModal";
import {deleteCategory} from "../services/service.service";
import {getRoles, getUserRoles} from "../../../public/auth/services/auth.service";

export default function ServiceTypeCategoriesTable(props: { data: any, options: any }) {
    const userRoles = getUserRoles()
    const onActionClick = (record: ServiceTypeCategoriesUI, action: Action) => {
        function handleDelete() {
            deleteCategory(record.id).then((response)=>{
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
                    title: 'Please enter category information',
                    okText: 'Edit',
                    cancelText: 'Close',
                    icon: undefined,
                    content: <EditCategoriesModal data={record}/>,
                    okButtonProps: {form:'edit-category-form', htmlType: 'submit'},
                });
                break;
            case ActionType.delete:
                IOModal.confirm({
                    title: 'Та бүтээгдэхүүнийг устгахдаа итгэлтэй байна уу?',
                    icon: undefined,
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
                    icon: undefined,
                    okText: 'Зөвшөөрөх'
                });
                break;
            default:
                break;
        }
    };

    const onAddClick = () => {
        IOModal.confirmForm({
            title: 'Please enter category information',
            okText: 'Add',
            cancelText: 'Close',
            icon: undefined,
            content: <EditCategoriesModal/>,
            okButtonProps: {form:'edit-category-form', htmlType: 'submit'},
        });
    };
    let columns: ColumnsType<ServiceTypeCategoriesUI> = []
    if (userRoles.service === "edit"){
        columns = [
            {
                title: '№',
                dataIndex: 'index',
                key: 'index',
            },
            {
                title: 'Categories',
                dataIndex: 'category',
                key: 'category'
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
    } else {
        columns = [
            {
                title: '№',
                dataIndex: 'index',
                key: 'index',
            },
            {
                title: 'Categories',
                dataIndex: 'category',
                key: 'category'
            },
        ];
    }



    props.options.map((data: any) => {
        let {id, option} = data;
        columns.splice(2,0, {
            title: option,
            dataIndex: option,
            key: option,
            render: (option: string, record) => {
                let isApplicable = false;
                record.options.map((applicable_options)=>{
                    if (id === applicable_options._id){
                        isApplicable = true
                    }
                    return null
                })
                return(
                    <>{isApplicable ? "Applicable" : "Not applicable"}</>
                )
            }
        });
        return null
    });
    const dataTablesUIs: ServiceTypeCategoriesUI[] = props.data.map(
        (record: ServiceTypeCategoriesUI, index: number) => {
            const actions: Action[] =[
                { icon: "icon-pencil7", element: <EditIcon />, type: ActionType.edit },
                { icon: "icon-trash", type: ActionType.delete, color: "#f45844", element: <DeleteIcon /> },
            ];
            return{
                ...record,
                actions: actions,
                index: index + 1,
                key: index,
            }
        }
    )

    return(
        <Table
            columns={columns}
            dataSource={dataTablesUIs}
            className="table table-responsive"
            pagination={{hideOnSinglePage: true}}
            rowClassName="table-row"
            footer={() => {
                if (userRoles.service === "edit"){
                    return(<div onClick={() => onAddClick()}>+ Add new category</div>)
                }
            }}
        />
    )
}