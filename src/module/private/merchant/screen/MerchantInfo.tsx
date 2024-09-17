import {Tabs, Select, Button, DatePicker, Form} from "antd";
import {useLocation, useParams} from "react-router";
import "../../componenets/css/MerchantTabBar.css"
import MerchantInformationTable from "../components/MerchantInformationTable";
import MerchantMenuTable from "../components/MerchantMenuTable";
import {useEffect, useState} from "react";
import {downloadMerchantReport, getMerchantInfo, getMerchantProducts} from "../services/merchant.service";
import {MerchantInformationUI, MerchantMenuUI, TimeTableDto} from "../entity/merchant.model";
import {useForm} from "antd/lib/form/Form";
import moment from "moment";
import {logout} from "../../../public/auth/services/auth.service";
import EstimateVariablesTable from "../../serviceType/components/EstimateVariablesTable";
import ConfigurationsTable from "../../serviceType/components/ConfigurationsTable";
import {ConfigurationsUI, EstimateVariablesUI} from "../../serviceType/entity/serviceType.model";
import {
    getCategories,
    getCategoriesByMerchant,
    getConfig,
    getConfigMerchant
} from "../../serviceType/services/service.service";
const { Option } = Select;
const { TabPane } = Tabs;

const data:MerchantInformationUI = {
    name: "",
    email: "",
    office: [""],
    timetable: [
        ],
    employeeList: [],
    colorCode: "",
    uPoint: "",
    tokiSpoc: "",
}

const data_menu: MerchantMenuUI[] = [

]

export default function MerchantInfo() {
    let {state} = useLocation() as any;
    const [visible, setVisible] = useState(false)
    const [merchantInfo, setMerchantInfo] = useState<MerchantInformationUI>(data)
    const [merchantProduct, setMerchantProduct] = useState<MerchantMenuUI[]>(data_menu)
    const [estimates, setEstimates] = useState<EstimateVariablesUI[]>([])
    const [config, setConfig] = useState<ConfigurationsUI[]>([])
    const [isDelivery, setIsDelivery] = useState<TimeTableDto[]>([])
    const [isTakeAway, setIsTakeAway] = useState<TimeTableDto[]>([])
    let key = state?.merchantEditKey as string;
    let merchantId = state?.merchantId as string;
    const [form] = useForm();
    let params = useParams()

    const onFinish = (values: any) => {
        let startDate;
        let endDate
        if (values.time==="custom"){
            startDate = moment(values.startDate).format("YYYY-MM-DD")
            endDate = moment(values.endDate).format("YYYY-MM-DD")
        } else {
            endDate = moment(new Date()).format("YYYY-MM-DD")
            let currentDate = new Date()
            if (values.time === "week"){
                startDate = moment(currentDate.setDate(currentDate.getDate() - 7)).format("YYYY-MM-DD")
            } else if (values.time === "month"){
                startDate = moment(currentDate.setDate(currentDate.getDate() - 30)).format("YYYY-MM-DD")
            } else if (values.time === "quarter"){
                startDate = moment(currentDate.setDate(currentDate.getDate() - 91)).format("YYYY-MM-DD")
            } else if (values.time === "half"){
                startDate = moment(currentDate.setDate(currentDate.getDate() - 182)).format("YYYY-MM-DD")
            } else if (values.time === "year"){
                startDate = moment(currentDate.setDate(currentDate.getDate() - 365)).format("YYYY-MM-DD")
            } else{
                startDate = moment(currentDate).format("YYYY-MM-DD")
            }
        }
        downloadMerchantReport(merchantId, startDate, endDate, values.reportType).then((response)=>{
            if(response.data.status_code===500 || response.data.status_code===403){
                logout()
            } else {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'merchant-report-'+values.reportType+'-'+ merchantInfo.name + '.xlsx'); //or any other extension
                document.body.appendChild(link);
                link.click();
            }
        })
    };

    useEffect(()=>{
        getMerchantInfo(params.merchantId ? params.merchantId : "").then((response)=>{
            const {data} = response.data;
            let timeTable;
            console.log(data)
            if((data.cancel_delivery_timetable !== undefined) || (data.cancel_delivery_timetable === [])){
                setIsDelivery(data.cancel_delivery_timetable)
            }
            if((data.cancel_take_away_timetable !== undefined) || (data.cancel_take_away_timetable === [])){
                setIsTakeAway(data.cancel_take_away_timetable)
            }
            if (data.is_timetable_set){
                timeTable = data.timetable.map((val: any)=>{
                    let text = "Даваа"
                    if(val.day===2){
                        text = "Мягмар"
                    } else if (val.day === 3){
                        text = "Лхагва"
                    }
                    else if (val.day === 4){
                        text = "Пүрэв"
                    }
                    else if (val.day === 5){
                        text = "Баасан"
                    }
                    else if (val.day === 6){
                        text = "Бямба"
                    }
                    else if (val.day === 7){
                        text = "Ням"
                    }
                    return{
                        name: text,
                        startDate: val.start_hour,
                        endDate: val.end_hour,
                        active: val.closed
                    }
                })
            }


            let employeeList = data.employees.map((employee: any)=>{
                return{
                    id: employee._id,
                    name: employee.name,
                    email: employee.email,
                    type: employee.type,
                    phoneNumber: employee.phone,
                    dataApproved: employee.data_approved
                }
            })

            setMerchantInfo({
                id: data._id,
                name: data.name,
                email: data.admin?.email ? data.admin.email : "No mail",
                tokiSpoc: data.toki_spoc,
                colorCode: data.brand_color,
                office: [data.physical_office.name],
                uPoint: data.upoint_token,
                timetable: timeTable,
                employeeList: employeeList,
            })
            getCategoriesByMerchant(merchantId).then((response)=>{
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
                setEstimates(tableData)
            })
        })
        getConfigMerchant(merchantId).then((response)=>{
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
        getMerchantProducts(params.merchantId ? params.merchantId : "").then((response)=>{
            console.log(response.data.data)
            let merchantProducts = response.data.data.map((values: any)=>{
                let priceInfo = values.variants.map((variant: any)=>{
                    let name = "";
                    variant.options.forEach((option: any)=>{
                        name += option.value + ","
                    })
                    return{
                        name: name,
                        price: variant.price
                    }
                })
                let inventoryInfo = values.variants.map((variant: any)=>{
                    let name = "";
                    variant.options.forEach((option: any)=>{
                        name += option.value + ","
                    })
                    return{
                        name: name,
                        inventory: variant.stock
                    }
                })
                return{
                    id: values._id,
                    name: values.name,
                    category: values.category?.name ? values.category.name : "No name",
                    photo: values.image,
                    price: priceInfo,
                    inventory: inventoryInfo
                }
            })
            setMerchantProduct(merchantProducts)
        })
    }, [])

    return (
        <>
            <Tabs defaultActiveKey={key} size="large">
                <TabPane tab="Merchant information" key="1">
                    <div className="row">
                        <div className="col-lg-8">
                            <MerchantInformationTable data={merchantInfo}/>
                        </div>
                    </div>
                </TabPane>
                <TabPane tab="Menu" key="2">
                    <MerchantMenuTable data={merchantProduct} merchantId={merchantId ? merchantId : ""}/>
                </TabPane>
                <TabPane tab="Report" key="3">
                    <Form name="merchant-report-form" onFinish={onFinish} form={form}>
                        <div className="row">
                            <div className="col-md-12">
                                <p>Please choose report duration</p>
                                <Form.Item name="time"
                                           rules={[
                                               {
                                                   required: true,
                                                   message: "Please select duration.",
                                               },
                                           ]}>
                                    <Select placeholder="Select" style={{width: 200}} onChange={(e) => {
                                        if (e === "custom") {
                                            setVisible(true)
                                        } else {
                                            setVisible(false)
                                        }
                                    }}>
                                        <Option value="week">Last week</Option>
                                        <Option value="month">1 month</Option>
                                        <Option value="quarter">3 month</Option>
                                        <Option value="half">6 month</Option>
                                        <Option value="year">1 year</Option>
                                        <Option value="custom">Custom</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            {
                                visible ?
                                    <div className="col-md-12 mt-3">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <p className="m-0" style={{width: '30%'}}>Start date:</p>
                                                    <Form.Item name="startDate"
                                                               rules={[
                                                                   {
                                                                       required: true,
                                                                       message: "Please select start date.",
                                                                   },
                                                               ]}>
                                                        <DatePicker style={{width: '70%'}} placeholder="yyyy/mm/dd"/>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                            <div className="col-md-9"/>
                                            <div className="col-md-3" style={{marginTop: '20px'}}>
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <p className="m-0" style={{width: '30%'}}>End date:</p>
                                                    <Form.Item name="endDate"
                                                               rules={[
                                                                   {
                                                                       required: true,
                                                                       message: "Please select end date.",
                                                                   },
                                                               ]}>
                                                        <DatePicker style={{width: '70%'}} placeholder="yyyy/mm/dd"/>
                                                    </Form.Item>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <></>
                            }
                            <div className="col-md-12" style={{marginTop: '20px'}}>
                                <p>Please choose report type</p>
                                <Form.Item name="reportType"
                                           rules={[
                                               {
                                                   required: true,
                                                   message: "Please select report type.",
                                               },
                                           ]}>
                                    <Select placeholder="Select" style={{width: 200}}>
                                        <Option value="product">Product Report</Option>
                                        <Option value="order">Order Report</Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className="col-md-12" style={{marginTop: '20px'}}>
                                <Button htmlType="submit" form='merchant-report-form'>Download</Button>
                            </div>
                        </div>
                    </Form>
                </TabPane>
                <TabPane tab="Configuration" key="4">
                    <div className="row">
                        <div className="col-md-5">
                            <h6 className="mb-3">Estimate variables</h6>
                            <EstimateVariablesTable data={estimates}/>
                        </div>
                        <div className="col-md-1"/>
                        <div className="col-md-6">
                            <h6 className="mb-3">Other configurations</h6>
                            <ConfigurationsTable data={config} isDelivery={isDelivery} isTakeAway={isTakeAway}/>
                        </div>
                    </div>
                </TabPane>
            </Tabs>
        </>
    )
}
