import {Link} from "react-router-dom";
import {Table} from "antd";
import '../../componenets/CustomTable/CustomTable.css'
import {ServiceTypeUI} from "../entity/serviceType.model";

const columns = [
    {
        title: '№',
        dataIndex: 'key',
        key: 'key',
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'Service name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Categories',
        dataIndex: ['id', 'name'],
        key: 'key',
        render: (text: any, row:any) => (
            <Link to={"/service/" + row['id'] + "/edit"} state={{
                headerTitle: "Service type > " + row['name'],
                headerButton: null,
                serviceTypeEditKey: "1"
            }} style={{color: '#ffc800'}}>View</Link>
        )
    },
    {
        title: 'Options',
        dataIndex: ['id', 'name'],
        key: 'key',
        render: (text: any, row:any) => (
            <Link to={"/service/" + row['id'] + "/edit"} state={{
                headerTitle: "Service type > " + row['name'],
                headerButton: null,
                serviceTypeEditKey: "2"
            }} style={{color: '#ffc800'}}>View</Link>
        )
    },
    {
        title: 'Configuration',
        dataIndex: ['id', 'name'],
        key: 'key',
        render: (text: any, row:any) => (
            <Link to={"/service/" + row['id'] + "/edit"} state={{
                headerTitle: "Service type > " + row['name'],
                headerButton: null,
                serviceTypeEditKey: "3"
            }} style={{color: '#ffc800'}}>View</Link>
        )
    },
    {
        title: 'Instructions',
        dataIndex: ['id', 'name'],
        key: 'key',
        render: (text: any, row:any) => (
            <Link to={"/service/" + row['id'] + "/edit"} state={{
                headerTitle: "Service type > " + row['name'],
                headerButton: null,
                serviceTypeEditKey: "4"
            }} style={{color: '#ffc800'}}>View</Link>
        )
    },
    {
        title: 'Table',
        dataIndex: ['id', 'name'],
        key: 'key',
        render: (text: any, row:any) => (
            <Link to={"/service/" + row['id'] + "/edit"} state={{
                headerTitle: "Service type > " + row['name'],
                headerButton: null,
                serviceTypeEditKey: "4"
            }} style={{color: '#ffc800'}}>View</Link>
        )
    }

];

export default function ServiceTypeIndexTable(props: { data: any }) {

    const tableDataUIs: ServiceTypeUI[] = props.data.map(
        (data: ServiceTypeUI, index: number) => {
            return{
                ...data,
                key: index+1,
                index: index
            }
        }
    )
    return (
        <Table
            columns={columns}
            dataSource={tableDataUIs}
            className="table table-responsive"
            pagination={{hideOnSinglePage: true}}
            rowClassName="table-row"
        />
    )
}