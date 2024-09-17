import {useEffect, useState} from "react";
import {getRoles} from "../services/role.service";
import RolesListTable from "../components/RolesListTable";
import { logout } from "../../../public/auth/services/auth.service";


export default function UserRoles() {
    const [data, setData] = useState([])
    useEffect(()=>{
        getRoles().then((response)=>{
            if(response.data.status_code===403){
                logout()
            }
            let tableData = response.data.data.map((values: any)=>{
                let scope: any = {};

                values.scopes.forEach((element: any)=>{
                    let elements = element.split("_")
                    if(elements[1] === "service"){
                        scope['service']= element
                    } else if (elements[1] === "office"){
                        scope['office']= element
                    }else if (elements[1] === "merchant"){
                        scope['merchant']= element
                    }else if (elements[1] === "configure"){
                        scope['configure']= element
                    }else if (elements[1] === "dataReport"){
                        scope['dataReport']= element
                    }else if (elements[1] === "report"){
                        scope['report']= element
                    }else if (elements[1] === "recommendation"){
                        scope['recommendation']= element
                    }else if (elements[1] === "userManagement"){
                        scope['userManagement']= element
                    }else if (elements[1] === "roles"){
                        scope['roles']= element
                    }
                })
                return{
                    id: values._id,
                    name: values.name,
                    scopes: scope
                }
            })
            setData(tableData)
        })

    }, [])
    return(
        <>
            <RolesListTable data={data}/>
        </>
    )
}