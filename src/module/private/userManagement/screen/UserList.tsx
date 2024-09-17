import NotFound from "../../../../shared/component/NotFound/NotFound";
import UserListTable from "../components/UserListTable";
import {useEffect, useState} from "react";
import {getUser} from "../services/user.service";
import { logout } from "../../../public/auth/services/auth.service";

export default function UserList() {
    const [data, setData] = useState([])
    useEffect(()=>{
        getUser().then((response)=>{
            if(response.data.status_code===403){
                logout()
            }
            let tableData = response.data.data.map((values: any)=>{
                return{
                    id: values._id,
                    name: values.name ,
                    email: values.email,
                    role: values.role?.name ? values.role?.name : "No role"
                }
            })
            setData(tableData)
        })
    }, [])

    return(
        <>
            {data.length === 0 ?
                <NotFound text={'"Please enter add admin by clicking on Add admin"'}  title={"Not Found"}/>
                :
                <>
                    <UserListTable data={data} />
                </>
            }

        </>
    )
}