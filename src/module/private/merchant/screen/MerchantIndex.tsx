import SearchBar from "../../componenets/SearchBar/SearchBar";
import MerchantListTable from "../components/MerchantListTable";
import DateFilter from "../../componenets/DateFilter/DateFilter";
import FilterSort from "../../componenets/FilterSort/FilterSort";
import DownloadButton from "../../componenets/DownloadButton/DownloadButton";
import {Menu} from "antd";
import {useEffect, useState} from "react";
import {downloadMerchants, getMerchants, getMerchantsByDate} from "../services/merchant.service";
import {MerchantUI} from "../entity/merchant.model";
import { logout } from "../../../public/auth/services/auth.service";


const data:MerchantUI[] = [
];

const { SubMenu } = Menu;


export default function MerchantIndex() {
    const [response, setResponse] = useState(data);
    const [event, setEvent] = useState(data);
    const [state, setState] = useState({
        sortedInfo: {
            order: "",
            columnKey: ""
        },
    })

    const setIndexASCSort = () =>{
        setState({
            sortedInfo: {
                order: 'ascend',
                columnKey: "index"
            }
        })
    }
    const setIndexDescSort = () =>{
        setState({
            sortedInfo: {
                order: 'descend',
                columnKey: "index"
            }
        })
    }

    const setNameASCSort = () =>{
        setState({
            sortedInfo: {
                order: 'ascend',
                columnKey: "name"
            }
        })
    }
    const setNameDescSort = () =>{
        setState({
            sortedInfo: {
                order: 'descend',
                columnKey: "name"
            }
        })
    }

    const setEmailASCSort = () =>{
        setState({
            sortedInfo: {
                order: 'ascend',
                columnKey: "email"
            }
        })
    }
    const setEmailDescSort = () =>{
        setState({
            sortedInfo: {
                order: 'descend',
                columnKey: "email"
            }
        })
    }

    const setSpocASCSort = () =>{
        setState({
            sortedInfo: {
                order: 'ascend',
                columnKey: "spoc"
            }
        })
    }
    const setSpocDescSort = () =>{
        setState({
            sortedInfo: {
                order: 'descend',
                columnKey: "spoc"
            }
        })
    }

    const setApprovedYesSort = () =>{
        setState({
            sortedInfo: {
                order: 'descend',
                columnKey: "actions"
            }
        })
    }
    const setApprovedNoSort = () =>{
        setState({
            sortedInfo: {
                order: 'ascend',
                columnKey: "actions"
            }
        })
    }

    const menu = (
        <Menu>
            <div className="p-2">
                <h6>
                    Sort by
                </h6>
            </div>
            <SubMenu title="№">
                <Menu.ItemGroup title="№">
                    <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" onClick={setIndexASCSort}>
                            ASC
                        </a>
                    </Menu.Item>
                    <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" onClick={setIndexDescSort}>
                            DESC
                        </a>
                    </Menu.Item>
                </Menu.ItemGroup>
            </SubMenu>
            <SubMenu title="Name">
                <Menu.ItemGroup title="Name">
                    <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" onClick={setNameASCSort}>
                            A-Z
                        </a>
                    </Menu.Item>
                    <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" onClick={setNameDescSort}>
                            Z-A
                        </a>
                    </Menu.Item>
                </Menu.ItemGroup>
            </SubMenu>
            <SubMenu title="Email">
                <Menu.ItemGroup title="Email">
                    <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" onClick={setEmailASCSort}>
                            A-Z
                        </a>
                    </Menu.Item>
                    <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" onClick={setEmailDescSort}>
                            Z-A
                        </a>
                    </Menu.Item>
                </Menu.ItemGroup>
            </SubMenu>
            <SubMenu title="Toki SPOC">
                <Menu.ItemGroup title="Toki SPOC">
                    <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" onClick={setSpocASCSort}>
                            A-Z
                        </a>
                    </Menu.Item>
                    <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" onClick={setSpocDescSort}>
                            Z-A
                        </a>
                    </Menu.Item>
                </Menu.ItemGroup>
            </SubMenu>
            <SubMenu title="Approved">
                <Menu.ItemGroup title="Approved">
                    <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" onClick={setApprovedYesSort}>
                            Yes
                        </a>
                    </Menu.Item>
                    <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" onClick={setApprovedNoSort}>
                            No
                        </a>
                    </Menu.Item>
                </Menu.ItemGroup>
            </SubMenu>
        </Menu>
    )

    useEffect(()=>{
        getMerchants().then((response)=>{
            if(response.data.status_code===403){
                logout()
            }
            let value:any = [];
            response.data.data.forEach((data: any)=>{
                let officeList = data.office.map((data: any)=>{
                    return{
                        name: data.name
                    }
                })
                if (data.is_approval_request_sent){
                    value.push({
                        id: data._id,
                        name: data.name,
                        email: data.admin?.email ? data.admin.email : "",
                        type: "Coffee",
                        spoc: data.toki_spoc,
                        active: data.is_approved,
                        colorCode: data.brand_color,
                        officeList: officeList,
                        uPoint: data.upoint_token,
                        blocked: data.is_blocked
                    })
                }
            })
            setEvent(value)
            setResponse(value)
        })
    }, [])

    const handleSearch = (searchText: string) => {
        const filteredEvents = response.filter(({name}) => {
            name = name.toLowerCase();
            return name.includes(searchText);
        })
        setEvent(filteredEvents);
    };

    const handleDateFilter = (startDate: any, endDate: any) => {
        getMerchantsByDate(startDate, endDate).then((response)=>{
            let value:any = [];
            response.data.data.forEach((data: any)=>{
                let officeList = data.office.map((data: any)=>{
                    return{
                        name: data.name
                    }
                })
                if (data.is_approval_request_sent){
                    value.push({
                        id: data._id,
                        name: data.name,
                        email: data.admin?.email ? data.admin.email : "",
                        type: "Coffee",
                        spoc: data.toki_spoc,
                        active: data.is_approved,
                        colorCode: data.brand_color,
                        officeList: officeList,
                        uPoint: data.upoint_token,
                        blocked: data.is_blocked
                    })
                }
            })
            setEvent(value)
    })
    }

    const handleDownload = () => {
        downloadMerchants().then((response)=>{
            if(response.data.status_code===500 || response.data.status_code===403){
                logout()
            } else {
                const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'merchants.xlsx'); //or any other extension
                document.body.appendChild(link);
                link.click();
            }
        })
    };

    return(
        <>
            <div className="d-flex align-items-center justify-content-between">
                <SearchBar onSearch={handleSearch} placeholder="Search Merchant Name"/>
                <div className="d-flex">
                    <DateFilter handleDateFilter={handleDateFilter}/>
                    <FilterSort menu={menu}/>
                    <DownloadButton handleDownload={handleDownload}/>
                </div>
            </div>
            <MerchantListTable data={event} state={state} setState={setState}/>
        </>
    )
}