import {ColumnsType} from "antd/lib/table";
import {Table} from "antd";
import {OrderInfoTableUI, OrderInfoUI, ProductOptionsUI, ProductsUI} from "../entity/review.model";

export default function OrderInfoTable(props: { data: OrderInfoUI, options: any }) {

    const columns: ColumnsType<OrderInfoTableUI> = [
        {
            title: '№',
            dataIndex: 'id',
            key: 'key',
            onCell: (record, rowIndex) => ({
                rowSpan: props.data.items.length
            }),
            render: (id: number, _, index) =>{
                const obj = {
                    children: id,
                    props: {
                        colSpan: 0
                    }
                }
                if(index === 0){
                    obj.props.colSpan = 1
                }
                return obj
            }
        },
        {
            title: 'Бүтээгдэхүүн',
            dataIndex: 'product',
            key: 'product'
        },
        {
            title: 'Нэгжийн үнэ',
            dataIndex: 'price',
            key: 'price'
        },
        {
            title: 'Тоо ширхэг',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Захиалгын төлөв',
            dataIndex: 'status',
            key: 'status',
            onCell: (record, rowIndex) => ({
                rowSpan: props.data.items.length
            }),
            render: (id: number, _, index) =>{
                const obj = {
                    children: id,
                    props: {
                        colSpan: 0
                    }
                }
                if(index === 0){
                    obj.props.colSpan = 1
                }
                return obj
            }
        },
        {
            title: 'Огноо',
            dataIndex: 'date',
            key: 'date',
            onCell: (record, rowIndex) => ({
                rowSpan: props.data.items.length
            }),
            render: (id: number, _, index) =>{
                const obj = {
                    children: id,
                    props: {
                        colSpan: 0
                    }
                }
                if(index === 0){
                    obj.props.colSpan = 1
                }
                return obj
            }
        },
    ];

    props.options.map((data: any) => {
        let {id, option} = data;
        columns.splice(2,0, {
            title: option,
            dataIndex: option,
            key: option,
            render: (option: any, record) => {
                let text = "";
                record.options.forEach((value: ProductOptionsUI)=>{
                    if (id === value.option){
                        text = value.value
                    }
                })
                return(
                    <>{text}</>
                )
            }
        });
        return null
    });

    const tableDataUIs: OrderInfoTableUI[] = props.data.items.map(
        (subData: ProductsUI, index: number) => {
            return{
                id: props.data.order_no,
                status: props.data.status,
                date: props.data.date,
                product: subData.product.name,
                price: subData.price,
                amount: subData.qty,
                key: index,
                options: subData.options
            }
        }
    )

    return(
        <Table
            columns={columns}
            dataSource={tableDataUIs}
            className="table table-responsive"
            pagination={{hideOnSinglePage: true}}
            rowClassName="table-row"
        />
    )
}
