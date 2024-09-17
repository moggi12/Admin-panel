import NotFound from "../../../../shared/component/NotFound/NotFound";
import ServiceTypeIndexTable from "../components/ServiceTypeIndexTable";
import {useEffect, useState} from "react";
import {getServiceTypes} from "../services/service.service";
import {ServiceTypeUI} from "../entity/serviceType.model";
import { logout } from "../../../public/auth/services/auth.service";

const data = [
    {
        id: "1",
        key: '1',
        name: 'Office coffee',
    }
];

export default function ServiceTypeIndex() {
    const [event, seEvent] = useState<ServiceTypeUI[]>(data)

    useEffect(()=>{
        getServiceTypes().then((response)=>{
            if(response.data.status_code===403){
                logout()
            }
            let value = response.data.data.map((data: any)=>{
                const {name,_id} = data
                return{
                    id: _id,
                    name: name,
                }
            })
            seEvent(value)
        })
    }, [])

    return(
        <>
            {event.length === 0 ? <NotFound text={"'Please add services by clicking on \"Create new services\"'"}  title={"Not Found"}/> :
                <ServiceTypeIndexTable data={event}/>}
        </>
    )
}