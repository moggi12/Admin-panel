import { Tabs } from 'antd';
import {useLocation} from "react-router";
import ServiceTypeCategoriesTable from "../components/ServiceTypeCategoriesTable";
import ServiceTypeOptionsTable from "../components/ServiceTypeOptionsTable";
import EstimateVariablesTable from "../components/EstimateVariablesTable";
import ConfigurationsTable from "../components/ConfigurationsTable";
import '../../componenets/css/ServiceTypeTabBar.css'
import TableTable from "../components/TableTable";
import {useEffect, useState} from "react";
import {getCategories, getOptions, getConfig, getTables} from "../services/service.service";
import {
    ConfigurationsUI,
    EstimateVariablesUI,
    ServiceTypeCategoriesUI,
    ServiceTypeOptionsUI
} from "../entity/serviceType.model";
import { logout } from '../../../public/auth/services/auth.service';
import Instructions from "../components/Instructions";


const { TabPane } = Tabs;

export default function ServiceTypeEdit() {
    let {state} = useLocation() as any;
    let key = state?.serviceTypeEditKey as string;
    const [estimates, setEstimates] = useState<EstimateVariablesUI[]>([])
    const [config, setConfig] = useState<ConfigurationsUI[]>([])
    const [options, setOptions] = useState<ServiceTypeOptionsUI[]>([])
    const [categories, setCategories] = useState<ServiceTypeCategoriesUI[]>([])
    const [tables, setTables] = useState<ServiceTypeCategoriesUI[]>([])


    useEffect(()=>{
        getCategories().then((response)=>{
            if(response.data.status_code===403){
                logout()
            }
            let tableData = response.data.data.map((value: any)=>{
                return{
                    id: value._id,
                    category: value.name,
                    estimates: value.minutes_to_prepare,
                    deliveryEstimate: value.minutes_to_deliver
                }
            })
            let categoryData = response.data.data.map((value: any)=>{
                return{
                    id: value._id,
                    category: value.name,
                    options: value.applicable_options,
                    image: value.logo
                }
            })
            setCategories(categoryData)
            setEstimates(tableData)
        })
        getOptions().then((response)=>{
            let optionData = response.data.data.map((value:any)=>{
                return{
                    id: value._id,
                    option: value.name,
                    type: value.value_type,
                    value: value.value
                }
            })
            setOptions(optionData)
        })
        getConfig().then((response)=>{
            let configData = response.data.data.map((value:any)=>{
                return{
                    id: value._id,
                    factor: value.name,
                    measurement: value.value,
                    measurementType: value.unit
                }
            })
            setConfig(configData)
        })
        getTables().then((response)=>{
            let tablesData = response.data.data.columns.map((values: any)=>{
                return{
                    id: values._id,
                    key: values.key,
                    name: values.label,
                    isShow: values.is_show
                }
            })
            setTables(tablesData)
        })

    }, [])

    return(
        <>
            <Tabs defaultActiveKey={key} size="large">
                <TabPane tab="Categories" key="1">
                    <ServiceTypeCategoriesTable data={categories} options={options}/>
                </TabPane>
                <TabPane tab="Options" key="2">
                    <ServiceTypeOptionsTable data={options}/>
                </TabPane>
                <TabPane tab="Configuration" key="3">
                    <div className="row">
                        <div className="col-md-5">
                            <h6 className="mb-3">Estimate variables</h6>
                            <EstimateVariablesTable data={estimates}/>
                        </div>
                        <div className="col-md-1"/>
                        <div className="col-md-6">
                            <h6 className="mb-3">Other configurations</h6>
                            <ConfigurationsTable data={config}/>
                        </div>
                    </div>
                </TabPane>
                <TabPane tab="Instruction" key="4">
                    <Instructions/>
                </TabPane>
                <TabPane tab="Table" key="5">
                    <TableTable data={tables}/>
                </TabPane>
            </Tabs>
        </>
    )
}