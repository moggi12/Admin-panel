import {Table} from "antd";
import "./CustomTable.css"

export default function CustomTable(props: any) {
    return(
        <>
            <Table columns={props.columns} dataSource={props.data} rowClassName="table-row" pagination={{hideOnSinglePage: true}}/>
        </>
    )
}