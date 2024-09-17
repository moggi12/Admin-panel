import NotFound from "../../../../shared/component/NotFound/NotFound";
import OfficeListAccordion from "../components/OfficeListAccordion";
import {useEffect, useState} from "react";
import {MerchantUI, OfficeUI} from "../entity/office.model";
import {getOffices} from "../services/office.service";
import { logout } from "../../../public/auth/services/auth.service";

const data_office = [
    {
        index: "1",
        name: "Office Name",
        location: {
            latitude: 105.1,
            longitude: 43.5
        },
        merchant: [
            {
                name: "test"
            },
            {
                name: "test"
            }
        ],
        floors: 10
    },
    {
        index: "2",
        name: "Office Name",
        location: {
            latitude: 105.1,
            longitude: 43.5
        },
        floors: 8
    }
]

export default function Office() {
    const [data, setData] = useState<OfficeUI[]>([])

    useEffect(()=>{
        getOffices().then((response)=>{
            if(response.data.status_code===403){
                logout()
            }
            let value = response.data.data.map((data: any)=>{
                const {name,_id, location, number_of_storey, merchants, logo, pin_icon, is_arena} = data;
                const {coordinates} = location;
                let merchantData:MerchantUI[] = [];
                merchants.forEach((merchant: any)=>{
                    if(merchant.is_approved){
                        merchantData.push({
                            id: merchant._id,
                            name: merchant.name,
                            logo: merchant.logo,
                            officeId: _id,
                        })
                    }
                })
                return{
                    id: _id,
                    name: name,
                    location: {
                        longitude: coordinates[0],
                        latitude: coordinates[1]
                    },
                    pin_icon: pin_icon,
                    floors: number_of_storey,
                    merchant: merchantData,
                    image: logo,
                    is_arena: is_arena
                }
            })
            setData(value)
        })
    }, [])
    return(
        <>
            {data_office.length === 0 ? <NotFound text={'Please add offices by clicking on "Add new office"'} title={"Not Found"}/> :
                <OfficeListAccordion data={data}/>}
        </>
    )
}