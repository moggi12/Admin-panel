import {ColumnsType} from "antd/lib/table";
import {InventoryUI} from "../entity/merchant.model";
import {Table} from "antd";

export default function MerchantMenuInventoryTable(props: { data: any }) {
    const columns: ColumnsType<InventoryUI> = [
        {
            title: 'Төрөл',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Нөөц',
            dataIndex: 'inventory',
            key: 'inventory',
            render: (inventory: number) => (<>{inventory}</>)
        },
    ];
    const serviceTypeOptionsUIs: InventoryUI[] = props.data.map(
        (data: InventoryUI, index: number) => {
            return{
                ...data,
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