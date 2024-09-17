import SearchBar from "../../componenets/SearchBar/SearchBar";
import DateFilter from "../../componenets/DateFilter/DateFilter";
import FilterSort from "../../componenets/FilterSort/FilterSort";
import DownloadButton from "../../componenets/DownloadButton/DownloadButton";
import {Menu} from "antd";
import ReviewListTable from "../components/ReviewListTable";
import {useEffect, useState} from "react";
import {
    downloadReview,
    getOrder,
    getOrderByDate,
    getReview,
    getReviewByDate,
    registerToken
} from "../services/review.service";
import moment from "moment";
import {getOptions} from "../../serviceType/services/service.service";
import {ServiceTypeOptionsUI} from "../../serviceType/entity/serviceType.model";
import {PaginationUI} from "../../../../shared/utils/entity/utility.model";
import {getUserRoles, logout} from "../../../public/auth/services/auth.service";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { firebaseApp } from "../../../..";
const { SubMenu } = Menu;



const initialData = [
    {
        merchant: 'Toki',
        merchantId: 1,
        username: "user123",
        phoneNumber: 88888888,
        review: 4,
        comment: "fast delivery",
        penalty: false,
        orderInfo: {
            id: 223,
            status: 'Захиалга биелсэн',
            date: '2022.03.07 14:32',
            products: [
                {
                    name: "Caramel latte",
                    shot: 1,
                    size: 'Small',
                    amount: 1,
                },
                {
                    name: "Americano",
                    shot: 1,
                    size: 'Small',
                    amount: 1,
                },
                {
                    name: "Cappuccino",
                    shot: 1,
                    size: 'Small',
                    amount: 1,
                },
            ]
        }
    },
    {
        orderId: 1234,
        merchant: 'Aoki',
        merchantId: 1,
        username: "user1234",
        phoneNumber: 99889988,
        review: 5,
        comment: "fast delivery testing",
        penalty: true,
        orderInfo: {
            id: 123,
            status: 'Захиалга биелсэн',
            date: '2022.03.07 14:32',
            products: [
                {
                    name: "Caramel latte",
                    shot: 1,
                    size: 'Small',
                    amount: 1,
                },
                {
                    name: "Americano",
                    shot: 1,
                    size: 'Small',
                    amount: 1,
                },
                {
                    name: "Cappuccino",
                    shot: 1,
                    size: 'Small',
                    amount: 1,
                },
            ]
        }
    },
]



export default function ReviewIndex() {
    const userRoles = getUserRoles()
    const [event, setEvent] = useState(initialData);
    const [options, setOptions] = useState<ServiceTypeOptionsUI[]>([])
    const [state, setState] = useState({
        sortedInfo: {
            order: "",
            columnKey: ""
        },
    })
    const [pagination, setPagination] = useState<PaginationUI>({
        page: 1,
        page_size: 10
    })

    function getReviewData(){
        getReview(pagination, null).then((response)=>{
            if(response.data.status_code===403){
                logout()
            }
            let value = response.data.data.items.map((data: any)=>{
                return{
                    id: data._id,
                    order_id: data.order_id,
                    order_no: data.order_no,
                    merchant: data.merchant,
                    merchantId: data.merchant_id,
                    username: data.customer_name,
                    phoneNumber: data.phone_no,
                    office_name: data.office_name,
                    review: data.star,
                    comment: data.comment,
                    penalty: data.is_compensated,
                    date: moment(data.created_at).format("YYYY-MM-DD HH:mm"),
                    delivery_estimate: moment(data.order_delivery_estimate).format("YYYY-MM-DD HH:mm"),
                    delivered_at: moment(data.order_delivered_at).format("YYYY-MM-DD HH:mm"),
                }
            })
            setEvent(value)
            setPagination({
                page: 1,
                page_size: 10,
                total_count: response.data.data.pagination.total_count
            })
        })
    }

    function getOrderData(){
        getOrder(pagination, null).then((response)=>{
            if(response.data.status_code===403){
                logout()
            }
            let value = response.data.data.items.map((data: any)=>{
                return{
                    id: data._id,
                    order_id: data._id,
                    order_no: data.order_no,
                    merchant: data.merchant,
                    merchantId: data.merchant_id,
                    username: data.customer_name,
                    phoneNumber: data.phone_no,
                    office_name: data.office_name,
                    review: data.star,
                    comment: data.comment,
                    penalty: data.is_compensated,
                    date: moment(data.created_at).format("YYYY-MM-DD HH:mm"),
                    delivery_estimate: moment(data.order_delivery_estimate).format("YYYY-MM-DD HH:mm"),
                    delivered_at: moment(data.order_delivered_at).format("YYYY-MM-DD HH:mm"),
                }
            })
            setEvent(value)
            setPagination({
                page: 1,
                page_size: 10,
                total_count: response.data.data.pagination.total_count
            })
        })
    }

    useEffect(() => {

        const messaging = getMessaging(firebaseApp);

        getToken(messaging, {
            vapidKey:
                "BM4US_VGTVnt5lJ-3hYA59IdX1ijizg6A-0CyZq2ngTEq05TVUeprAmI3pXTMw-P1W97r3AGOjGt8FE2pO1U2nI",
        }).then((x) => {
            registerToken(x).then((x) => {
                console.log("Firebase token register: ", x);
            });
        });

        window.addEventListener("visibilitychange", handleVisibilityChange);

        onMessage(messaging, (payload) => {
            getOrderData()

            console.log("Firebase payload: ", payload);

            new Notification(payload.notification?.title ?? "Мэдэгдэл", {
                body: payload.notification?.body,
            });
        });

        Notification.requestPermission().then((result) => {
            console.log("Notification permission result: ", result);
        });

        return () => {
            window.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
            getOrder(pagination, null).then((response)=>{
                if(response.data.status_code===403){
                    logout()
                }
                let value = response.data.data.items.map((data: any)=>{
                    let productItems = data.order.items.map((item: any)=>{
                        let optionsData = item.options.map((option: any)=>{
                            return{
                                option: option.option,
                                value: option.value
                            }
                        })
                        return{
                            name: item.product_name,
                            amount: item.qty,
                            options: optionsData
                        }
                    })
                    let orderInfo = {
                        id: data.order.order_no==="" ? "No order ID" : data.order.order_no,
                        status: "Захиалга биелсэн",
                        date: moment(data.order.created_at).format("YYYY-MM-DD HH:mm"),
                        products: productItems,
                    }
                    return{
                        id: data._id,
                        orderInfo: orderInfo,
                        merchant: data.merchant,
                        merchantId: data.merchant_id,
                        username: data.customer_name,
                        phoneNumber: data.phone_no,
                        office_name: data.office_name,
                        review: data.star,
                        comment: data.comment,
                        penalty: data.is_compensated,
                        date: moment(data.created_at).format("YYYY-MM-DD HH:mm"),
                        delivery_estimate: moment(data.order.delivery_estimate).format("YYYY-MM-DD HH:mm"),
                        delivered_at: moment(data.order.delivered_at).format("YYYY-MM-DD HH:mm"),
                    }
                })
                setEvent(value)
                setPagination({
                    page: 1,
                    page_size: 10,
                    total_count: response.data.data.pagination.total_count
                })
            })
        }
    };

    useEffect(()=>{
        if (userRoles.report === "edit"){
            getReviewData()
        } else{
            getOrderData()
        }
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
    }, [])

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

    const setIdASCSort = () =>{
        setPagination({...pagination, sort_by: "order_no", sort_type: "asc"})
        if (userRoles.report === "edit"){
            getReviewData()
        } else{
            getOrderData()
        }

        setState({
            sortedInfo: {
                order: 'ascend',
                columnKey: "orderId"
            }
        })
    }
    const setIdDescSort = () =>{
        setPagination({...pagination, sort_by: "order_no", sort_type: "desc"})
        if (userRoles.report === "edit"){
            getReviewData()
        } else{
            getOrderData()
        }
        setState({
            sortedInfo: {
                order: 'descend',
                columnKey: "orderId"
            }
        })
    }

    const setMerchantASCSort = () =>{
        setPagination({...pagination, sort_by: "merchant", sort_type: "asc"})
        if (userRoles.report === "edit"){
            getReviewData()
        } else{
            getOrderData()
        }
        setState({
            sortedInfo: {
                order: 'ascend',
                columnKey: "merchant"
            }
        })
    }
    const setUsernameDescSort = () =>{
        setPagination({...pagination, sort_by: "customer_name", sort_type: "desc"})
        if (userRoles.report === "edit"){
            getReviewData()
        } else{
            getOrderData()
        }

        setState({
            sortedInfo: {
                order: 'descend',
                columnKey: "username"
            }
        })
    }

    const setUsernameASCSort = () =>{
        setPagination({...pagination, sort_by: "customer_name", sort_type: "asc"})
        if (userRoles.report === "edit"){
            getReviewData()
        } else{
            getOrderData()
        }
        setState({
            sortedInfo: {
                order: 'ascend',
                columnKey: "username"
            }
        })
    }
    const setMerchantDescSort = () =>{
        setPagination({...pagination, sort_by: "merchant", sort_type: "desc"})
        if (userRoles.report === "edit"){
            getReviewData()
        } else{
            getOrderData()
        }
        setState({
            sortedInfo: {
                order: 'descend',
                columnKey: "merchant"
            }
        })
    }

    const setReviewASCSort = () =>{
        setPagination({...pagination, sort_by: "star", sort_type: "asc"})
        if (userRoles.report === "edit"){
            getReviewData()
        } else{
            getOrderData()
        }
        setState({
            sortedInfo: {
                order: 'ascend',
                columnKey: "review"
            }
        })
    }
    const setReviewDescSort = () =>{
        setPagination({...pagination, sort_by: "star", sort_type: "desc"})
        if (userRoles.report === "edit"){
            getReviewData()
        } else{
            getOrderData()
        }
        setState({
            sortedInfo: {
                order: 'descend',
                columnKey: "review"
            }
        })
    }

    const setPenaltyASCSort = () =>{
        setPagination({...pagination, sort_by: "is_compensated", sort_type: "asc"})
        if (userRoles.report === "edit"){
            getReviewData()
        } else{
            getOrderData()
        }
    }
    const setPenaltyDescSort = () =>{
        setPagination({...pagination, sort_by: "is_compensated", sort_type: "desc"})
        if (userRoles.report === "edit"){
            getReviewData()
        } else{
            getOrderData()
        }

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
            <SubMenu title="Order ID">
                <Menu.ItemGroup title="Order ID">
                    <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" onClick={setIdASCSort}>
                            ASC
                        </a>
                    </Menu.Item>
                    <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" onClick={setIdDescSort}>
                            DESC
                        </a>
                    </Menu.Item>
                </Menu.ItemGroup>
            </SubMenu>
            <SubMenu title="Merchant">
                <Menu.ItemGroup title="Merchant">
                    <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" onClick={setMerchantASCSort}>
                            A-Z
                        </a>
                    </Menu.Item>
                    <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" onClick={setMerchantDescSort}>
                            Z-A
                        </a>
                    </Menu.Item>
                </Menu.ItemGroup>
            </SubMenu>
            <SubMenu title="Username">
                <Menu.ItemGroup title="Username">
                    <Menu.Item key={1}>
                        <a target="_blank" rel="noopener noreferrer" onClick={setUsernameASCSort}>
                            A-Z
                        </a>
                    </Menu.Item>
                    <Menu.Item key={2}>
                        <a target="_blank" rel="noopener noreferrer" onClick={setUsernameDescSort}>
                            Z-A
                        </a>
                    </Menu.Item>
                </Menu.ItemGroup>
            </SubMenu>
            <SubMenu title="Review">
                <Menu.ItemGroup title="Review">
                    <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" onClick={setReviewASCSort}>
                            ASC
                        </a>
                    </Menu.Item>
                    <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" onClick={setReviewDescSort}>
                            DESC
                        </a>
                    </Menu.Item>
                </Menu.ItemGroup>
            </SubMenu>
            <SubMenu title="Penalty">
                <Menu.ItemGroup title="Penalty">
                    <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" onClick={setPenaltyASCSort}>
                            Compensate
                        </a>
                    </Menu.Item>
                    <Menu.Item>
                        <a target="_blank" rel="noopener noreferrer" onClick={setPenaltyDescSort}>
                            Received
                        </a>
                    </Menu.Item>
                </Menu.ItemGroup>
            </SubMenu>
        </Menu>
    )

    const handleSearch = (searchText: string) => {
        setPagination({...pagination, search: searchText})
        if (userRoles.report === "edit"){
            getReviewData()
        } else{
            getOrderData()
        }
    };

    const handleDownload = () => {
        downloadReview().then((response)=>{
            if(response.data.status_code===500 || response.data.status_code===403){
                logout()
            } else {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'file.xlsx'); //or any other extension
                document.body.appendChild(link);
                link.click();
            }
        })
    };

    const handleDateFilter = (startDate: any, endDate: any) => {
        if (userRoles.report === "edit"){
            getReviewByDate(pagination, startDate, endDate).then((response)=>{
                if(response.data.status_code===403){
                    logout()
                }
                let value = response.data.data.items.map((data: any)=>{
                    return{
                        id: data._id,
                        order_id: data.order_id,
                        order_no: data.order_no,
                        merchant: data.merchant,
                        merchantId: data.merchant_id,
                        username: data.customer_name,
                        phoneNumber: data.phone_no,
                        office_name: data.office_name,
                        review: data.star,
                        comment: data.comment,
                        penalty: data.is_compensated,
                        date: moment(data.created_at).format("YYYY-MM-DD HH:mm"),
                        delivery_estimate: moment(data.order_delivery_estimate).format("YYYY-MM-DD HH:mm"),
                        delivered_at: moment(data.order_delivered_at).format("YYYY-MM-DD HH:mm"),
                    }
                })
                setEvent(value)
                setPagination({...response.data.data.pagination, start_date: startDate, end_date: endDate})
            })
        } else {
            getOrderByDate(pagination, startDate, endDate).then((response)=>{
                if(response.data.status_code===403){
                    logout()
                }
                let value = response.data.data.items.map((data: any)=>{
                    return{
                        id: data._id,
                        order_id: data._id,
                        order_no: data.order_no,
                        merchant: data.merchant,
                        merchantId: data.merchant_id,
                        username: data.customer_name,
                        phoneNumber: data.phone_no,
                        office_name: data.office_name,
                        review: data.star,
                        comment: data.comment,
                        penalty: data.is_compensated,
                        date: moment(data.created_at).format("YYYY-MM-DD HH:mm"),
                        delivery_estimate: moment(data.order_delivery_estimate).format("YYYY-MM-DD HH:mm"),
                        delivered_at: moment(data.order_delivered_at).format("YYYY-MM-DD HH:mm"),
                    }
                })
                setEvent(value)
                setPagination({...response.data.data.pagination, start_date: startDate, end_date: endDate})
            })
        }

    }

    return(
        <>
            <div className="d-flex align-items-center justify-content-between">
                <SearchBar onSearch={handleSearch} placeholder="Search Merchant/Username/Phonenumber"/>
                <div className="d-flex">
                    <DateFilter handleDateFilter={handleDateFilter}/>
                    <FilterSort menu={menu}/>
                    <DownloadButton handleDownload={handleDownload}/>
                </div>
            </div>
            <ReviewListTable data={event} setEvent={setEvent} state={state} setState={setState} options={options} pagination={pagination} setPagination={setPagination}/>
        </>
    )
}
