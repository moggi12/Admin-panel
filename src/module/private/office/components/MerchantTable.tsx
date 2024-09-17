import {Action, ActionType} from "../../../../shared/utils/entity/utility.model";
import {IOModal} from "../../../../shared/utils/Modal/Modal";
import {ColumnsType} from "antd/lib/table";
import {ReactComponent as DeleteIcon} from "../../../../shared/icons/delete-icon.svg";
import {notification, Table} from "antd";
import {MerchantUI} from "../entity/office.model";
import EditMerchantModal from "./EditMerchantModal";
import {deleteOfficeMerchant} from "../services/office.service";
import PasswordContent from "../../componenets/PasswordModal/PasswordModal";
import {getUserRoles} from "../../../public/auth/services/auth.service";
import '../css/MerchantTable.css'

export default function MerchantTable(props: { data: any }) {
    const userRoles = getUserRoles()
    const onActionClick = (data: MerchantUI, action: Action) => {
        function handleDelete() {
            deleteOfficeMerchant(data.officeId, data.id).then((response)=>{
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
                    title: 'Please edit the field',
                    okText: 'Edit',
                    icon: undefined,
                    content: <EditMerchantModal data={data}/>,
                    okButtonProps: {form:'edit-category-form', htmlType: 'submit'},
                });
                break;
            case ActionType.delete:
                IOModal.confirm({
                    title: 'Та уг кофе шопыг хасахдаа итгэлтэй байна уу?',
                    okText: 'Тийм',
                    icon: undefined,
                    content: "Тийм дарснаар тус оффис дахь хэрэглэгчид\n" +
                        "уг кофе шопоос захиалга хийх боломжгүй болно",
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

    let columns: ColumnsType<MerchantUI> = [
        {
            title: '№',
            dataIndex: 'index',
            key: 'index',
            width: '5%'
        },
        {
            title: 'Coffee shop name',
            dataIndex: 'name',
            key: 'name',
            width: '30%'
        },
        {
            title: 'Logo',
            dataIndex: 'logo',
            key: 'logo',
            width: '15%',
            render: (logo, record) => (<><img src={logo} alt="Logo" width={40} height={40}/></>)
        },
    ];
    if(userRoles.office === "edit"){
        columns = [
            {
                title: '№',
                dataIndex: 'index',
                key: 'index',
                width: '5%'
            },
            {
                title: 'Coffee shop name',
                dataIndex: 'name',
                key: 'name',
                width: '30%'
            },
            {
                title: 'Logo',
                dataIndex: 'logo',
                key: 'logo',
                width: '15%',
                render: (logo, record) => (<><img src={logo} alt="Logo" width={40} height={40}/></>)
            },
            {
                title: "",
                dataIndex: "actions",
                key: "actions",
                align: 'right',
                render: (actions: Action[], record) => (
                    <div className="list-icons-end">
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
    const serviceTypeCategoriesUIs: MerchantUI[] = props.data.map(
        (data: MerchantUI, index: number) => {
            const actions: Action[] =[
                { icon: "icon-trash", type: ActionType.delete, color: "#f45844", element: <DeleteIcon /> },
            ];
            return{
                ...data,
                actions: actions,
                index: index + 1,
                key: index,
            }
        }
    )

    return(
        <Table
            columns={columns}
            dataSource={serviceTypeCategoriesUIs}
            className="table table-responsive table-striped-rows"
            pagination={{hideOnSinglePage: true}}
            rowClassName="table-row"
        />
    )
}