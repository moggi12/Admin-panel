import {useEffect, useState} from "react";
import SearchBar from "../../componenets/SearchBar/SearchBar";
import DashboardTable from "../components/DashboardTable";
import {getDashboard} from "../services/report.service";
import {logout} from "../../../public/auth/services/auth.service";

export default function Dashboard() {
    const [response, setResponse] = useState<any>();
    const [event, setEvent] = useState<any>([{
        'name': 'test'
    }]);
    const [state, setState] = useState({
        sortedInfo: {
            order: "",
            columnKey: ""
        },
    })

    useEffect(()=>{
        getDashboard().then((response)=>{
            if(response.data.status_code===403){
                logout()
            }
            let value = response.data.data.map((data: any)=>{
                return{
                    name: data.merchant_name,
                    merchantId: data.merchant_id,
                    delivery: data.delivery,
                    late: data.on_time,
                    takeAway: data.take_away,
                    busyMode: data.merchant_is_busy,
                    tempClosed: data.merchant_temporary_closed
                }
            })
            setEvent(value)
            setResponse(value)
        })
    },[])

    const handleSearch = (searchText: string) => {
        const filteredEvents = response.filter(({name}: any) => {
            name = name?.toLowerCase();
            return name?.includes(searchText);
        })
        setEvent(filteredEvents);
    };


    return(
        <>
            <div className="d-flex align-items-center justify-content-between">
                <SearchBar onSearch={handleSearch} placeholder="Search Merchant Name"/>
            </div>
            <DashboardTable data={event} state={state} setState={setState}/>
        </>
    )
}
