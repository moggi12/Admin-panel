import {InventoryUI, MerchantMenuUI, PriceUI, TimeTableUI} from "../entity/merchant.model";
import {Action, ActionType} from "../../../../shared/utils/entity/utility.model";
import {IOModal} from "../../../../shared/utils/Modal/Modal";
import {ColumnsType} from "antd/lib/table";
import {ReactComponent as DeleteIcon} from "../../../../shared/icons/delete-icon.svg";
import {notification, Table} from "antd";
import MerchantMenuPriceTable from "./MerchantMenuPriceTable";
import MerchantMenuInventoryTable from "./MerchantMenuInventoryTable";
import {deleteMerchantProduct} from "../services/merchant.service";
import PasswordContent from "../../componenets/PasswordModal/PasswordModal";
import {useParams} from "react-router";
import {getUserRoles} from "../../../public/auth/services/auth.service";


export default function MerchantMenuTable(props: { data: any, merchantId: string }) {
    const {merchantId} = useParams()
    const userRoles = getUserRoles()
    const onActionClick = (data: MerchantMenuUI, action: Action) => {
        function handleDelete() {
            deleteMerchantProduct(merchantId,data.id).then((response)=>{
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
                    title: 'Та уг мерчантын хүсэлтийг зөвшөөрөхдөө \n' +
                        'итгэлтэй байна уу?',
                    okText: 'Тийм ',
                    icon: undefined,
                    content: 'Тийм дарснаар уг мерчант хэрэглэгчдэд харагдаж\n' +
                        'эхлэх болно'
                });
                break;
            case ActionType.delete:
                IOModal.confirm({
                    title: 'Та уг бүтээгдхүүнийг устгахад \n' +
                        'итгэлтэй байна уу?',
                    okText: 'Тийм',
                    icon: undefined,
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

    const onClickPrice = (data: PriceUI[], title: string) => {
        IOModal.show({
            title: title,
            content: <div className="row px-5"><MerchantMenuPriceTable data={data}/></div>,
            width: '1000px'
        });
    }
    const onClickInventory = (data: InventoryUI[], title: string) => {
        IOModal.show({
            title: title,
            content: <div className="row px-5"><MerchantMenuInventoryTable data={data}/></div>,
            width: '1000px'
        });
    }

    let columns: ColumnsType<MerchantMenuUI> = [
        {
            title: '№',
            dataIndex: 'key',
            key: 'key'
        },
        {
            title: 'Photo',
            dataIndex: 'photo',
            key: 'photo',
            render: (photo: string)=>(
                <img src={photo} alt="product" width={100}/>
            )
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Product name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price: PriceUI[], record) => (
                <a style={{color: '#FFC800'}} onClick={()=>{onClickPrice(price, record.category)}}>View</a>
            )
        },
        {
            title: 'Inventory',
            dataIndex: 'inventory',
            key: 'inventory',
            render: (inventory: InventoryUI[], record) => (
                <a style={{color: '#FFC800'}} onClick={()=>{onClickInventory(inventory, record.category)}}>View</a>
            )
        },
    ];

    if (userRoles.merchant === "edit"){
        columns = [
            {
                title: '№',
                dataIndex: 'key',
                key: 'key'
            },
            {
                title: 'Photo',
                dataIndex: 'photo',
                key: 'photo',
                render: (photo: string)=>(
                    <img src={photo} alt="product" width={100}/>
                )
            },
            {
                title: 'Category',
                dataIndex: 'category',
                key: 'category',
            },
            {
                title: 'Product name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
                render: (price: PriceUI[], record) => (
                    <a style={{color: '#FFC800'}} onClick={()=>{onClickPrice(price, record.category)}}>View</a>
                )
            },
            {
                title: 'Inventory',
                dataIndex: 'inventory',
                key: 'inventory',
                render: (inventory: InventoryUI[], record) => (
                    <a style={{color: '#FFC800'}} onClick={()=>{onClickInventory(inventory, record.category)}}>View</a>
                )
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

    const serviceTypeOptionsUIs: MerchantMenuUI[] = props.data.map(
        (data: MerchantMenuUI, index: number) => {
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
            dataSource={serviceTypeOptionsUIs}
            className="table table-responsive"
            pagination={{hideOnSinglePage: true}}
            rowClassName="table-row"
        />
    )
}