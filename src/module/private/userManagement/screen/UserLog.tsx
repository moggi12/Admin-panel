import {useEffect, useState} from "react";
import AdminLogTable from "../components/AdminLogTable";
import {getAdminLogs} from "../services/user.service";
import moment from "moment";
import {AdminLogUI} from "../entity/user.model";
import {PaginationUI} from "../../../../shared/utils/entity/utility.model";
import { logout } from "../../../public/auth/services/auth.service";

const data: AdminLogUI[] = [];


export default function UserLog() {
    const [event, setEvent] = useState(data)
    const [pagination, setPagination] = useState<PaginationUI>({
        page: 1,
        page_size: 10
    })

    useEffect(()=>{
        getAdminLogs(pagination).then((response)=>{
            if(response.data.status_code===403){
                logout()
            }
            let value = response.data.data.items.map((data: any)=>{
                return{
                    name: data.user===null ? '' : data.user.name,
                    email: data.user===null ? '' : data.user.email,
                    date: moment(data.created_at).format('YYYY/MM/DD HH:mm:ss'),
                    action: data.action
                }
            })
            setPagination(response.data.data.pagination)
            setEvent(value)
        })
    }, [])
    return(
        <>
            <AdminLogTable data={event} setEvent={setEvent} pagination={pagination} setPagination={setPagination}/>
        </>
    )
}