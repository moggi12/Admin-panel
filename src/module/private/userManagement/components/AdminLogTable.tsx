import {ColumnsType} from "antd/lib/table";
import {Table} from "antd";
import {AdminLogUI} from "../entity/user.model";
import {PaginationUI} from "../../../../shared/utils/entity/utility.model";
import {useEffect} from "react";
import {getAdminLogs} from "../services/user.service";
import moment from "moment";



export default function AdminLogTable(props: { data: any, pagination: PaginationUI | undefined, setPagination: any, setEvent: any }) {

    useEffect(()=>{
        getAdminLogs(props.pagination).then((response)=>{
            let value = response.data.data.items.map((data: any)=>{
                return{
                    name: data.user===null ? '' : data.user.name,
                    email: data.user===null ? '' : data.user.email,
                    date: moment(data.created_at).format('YYYY/MM/DD HH:mm:ss'),
                    action: data.action
                }
            })
            props.setEvent(value)
        })
    }, [props.pagination])

    const columns: ColumnsType<AdminLogUI> = [
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
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action'
        },
    ];
    const tableDataSourceUIs: AdminLogUI[] = props.data.map(
        (data: AdminLogUI, index: number) => {
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
            dataSource={tableDataSourceUIs}
            className="table table-responsive"
            pagination={{
                hideOnSinglePage: true,
                pageSize: 10,
                total: props.pagination?.total_count,
                showSizeChanger: false,
                onChange: (_page: number)=>{
                    props.setPagination({
                        ...props.pagination,
                        page: _page
                    })
            }
        }}
            rowClassName="table-row"
        />
    )
}