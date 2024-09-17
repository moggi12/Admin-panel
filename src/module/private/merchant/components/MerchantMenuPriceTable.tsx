import {PriceUI} from "../entity/merchant.model";
import {ColumnsType} from "antd/lib/table";
import {Table} from "antd";

export default function MerchantMenuPriceTable(props: { data: any }) {

    const columns: ColumnsType<PriceUI> = [
        {
            title: 'Төрөл',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Үнэ',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => (<>{price}₮</>)
        },
    ];
    const serviceTypeOptionsUIs: PriceUI[] = props.data.map(
        (data: PriceUI, index: number) => {
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