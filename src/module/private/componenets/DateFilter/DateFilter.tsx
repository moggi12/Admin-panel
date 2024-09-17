import {Menu, Dropdown, Input, Button, DatePicker, Form} from 'antd';
import {ReactComponent as DataFilterIcon} from "../../../../shared/icons/date-select-icon.svg";
import "./DateFilter.css"
import {useState} from "react";
import moment from "moment";
import {useForm} from "antd/lib/form/Form";
const { SubMenu } = Menu;



export default function DateFilter(props: {handleDateFilter: any}) {
    let endDate = moment(new Date().setHours(23, 59, 59)).format("YYYY-MM-DDTHH:mm:ss")
    const [visible, setVisible] = useState(false)
    const [openKeys, setOpenKeys] = useState<string[]>([])
    let currentDate = new Date()
    currentDate.setHours(0,0,0)
    const [form] = useForm();

    const onClickWeek = () =>{
        let startDate = moment(currentDate.setDate(currentDate.getDate() - 7)).format("YYYY-MM-DDTHH:mm:ss")
        props.handleDateFilter(startDate, endDate);
        setOpenKeys([])
        setVisible(false)
    }
    const onClickToday = () =>{
        let startDate = moment(currentDate.setDate(currentDate.getDate())).format("YYYY-MM-DDTHH:mm:ss")
        props.handleDateFilter(startDate, endDate);
        setOpenKeys([])
        setVisible(false)
    }
    const onClickMonth = () =>{
        let startDate = moment(currentDate.setDate(currentDate.getDate() - 30)).format("YYYY-MM-DDTHH:mm:ss")
        props.handleDateFilter(startDate, endDate);
        setOpenKeys([])
        setVisible(false)
    }
    const onClickHalf = () =>{
        let startDate = moment(currentDate.setDate(currentDate.getDate() - 182)).format("YYYY-MM-DDTHH:mm:ss")
        props.handleDateFilter(startDate, endDate);
        setOpenKeys([])
        setVisible(false)
    }
    const onClickYear = () =>{
        let startDate = moment(currentDate.setDate(currentDate.getDate() - 365)).format("YYYY-MM-DDTHH:mm:ss")
        props.handleDateFilter(startDate, endDate);
        setOpenKeys([])
        setVisible(false)
    }

    const onFinish = (values: any) => {
        let startDate = moment(values.startDate).startOf('day').format("YYYY-MM-DDTHH:mm:ss")
        endDate = moment(values.endDate).endOf('day').format("YYYY-MM-DDTHH:mm:ss")
        props.handleDateFilter(startDate, endDate);
        setOpenKeys([])
        setVisible(false)
    }

    const menu = (
        <Menu triggerSubMenuAction="click" openKeys={openKeys}>
            <div className="p-2">
                <h6>
                    Choose report duration
                </h6>
            </div>
            <SubMenu key="key1" title="Custom Time" onTitleClick={()=> {
                if (openKeys.length === 0) {
                    setOpenKeys(["key1"])
                }else{
                    setOpenKeys([])
                }
            }}>
                <Menu.ItemGroup title="Enter date">
                    <Form name="date-filter-form" onFinish={onFinish} form={form}>
                        <div className="p-1 d-flex flex-column">
                            <div className="py-1">Start date</div>
                            <Form.Item name="startDate"
                                       rules={[
                                           {
                                               required: true,
                                               message: "Start date required.",
                                           },
                                       ]}>
                                <DatePicker suffixIcon={null} placeholder="yyyy/mm/dd"/>
                            </Form.Item>
                            <div className="py-1">End date</div>
                            <Form.Item name="endDate"
                                       rules={[
                                           {
                                               required: true,
                                               message: "End date required.",
                                           },
                                       ]}>
                                <DatePicker suffixIcon={null} placeholder="yyyy/mm/dd"/>
                            </Form.Item>
                            <Button className="mt-2 mb-1" htmlType="submit" form="date-filter-form">Search</Button>
                        </div>
                    </Form>
                </Menu.ItemGroup>
            </SubMenu>
            <Menu.Item>
                <a onClick={onClickToday}>
                    Today
                </a>
            </Menu.Item>
            <Menu.Item>
                <a onClick={onClickWeek}>
                    7 days
                </a>
            </Menu.Item>
            <Menu.Item>
                <a onClick={onClickMonth}>
                    1 month
                </a>
            </Menu.Item>
            <Menu.Item>
                <a onClick={onClickHalf}>
                    6 months
                </a>
            </Menu.Item>
            <Menu.Item>
                <a onClick={onClickYear}>
                    1 year
                </a>
            </Menu.Item>
        </Menu>
    )

    return(
        <>
            <Dropdown placement="bottomRight" overlay={menu} className="px-2" visible={visible}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    <div className="paper" onClick={()=> {if(visible){setVisible(false);setOpenKeys([])}else{setVisible(true);setOpenKeys([])}}}>
                        <DataFilterIcon />
                    </div>
                </a>
            </Dropdown>
        </>
    )
}
