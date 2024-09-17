import {IOModal} from "../../../../shared/utils/Modal/Modal";
import {ColumnsType} from "antd/lib/table";
import {notification, Table} from "antd";
import {OrderInfoUI, ReviewUI} from "../entity/review.model";
import {useNavigate} from "react-router-dom";
import OrderInfoTable from "./OrderInfoTable";
import {getOrder, getOrderById, getReview, reviewCompensate} from "../services/review.service";
import PasswordContent from "../../componenets/PasswordModal/PasswordModal";
import {parseInt} from "lodash";
import {PaginationUI} from "../../../../shared/utils/entity/utility.model";
import {useEffect} from "react";
import moment from "moment";
import {getConfig} from "../../serviceType/services/service.service";
import {getUserRoles} from "../../../public/auth/services/auth.service";

export default function ReviewListTable(props: { data: any, state: any, setState: any, options: any, pagination: PaginationUI | undefined, setPagination: any, setEvent: any }) {
    const navigate = useNavigate()
    const userRoles = getUserRoles()
    let { sortedInfo } = props.state;

    useEffect(()=>{
        if (userRoles.report === "edit"){
            getReview(props.pagination, null).then((response)=>{
                let value = response.data.data.items.map((data: any)=>{
                    // let productItems = data.order.items.map((item: any)=>{
                    //     let optionsData = item.options.map((option: any)=>{
                    //         return{
                    //             option: option.option,
                    //             value: option.value
                    //         }
                    //     })
                    //     return{
                    //         name: item.product_name,
                    //         amount: item.qty,
                    //         price: item.product_price,
                    //         options: optionsData
                    //     }
                    // })
                    // let orderInfo = {
                    //     id: data.order.order_no==="" ? "No order ID" : data.order.order_no,
                    //     status: "Захиалга биелсэн",
                    //     date: moment(data.order.created_at).format("YYYY-MM-DD HH:mm"),
                    //     products: productItems,
                    // }
                    return{
                        id: data._id,
                        order_id: data.order_id,
                        order_no: data.order_no,
                        merchant: data.merchant,
                        office_name: data.office_name,
                        merchantId: data.merchant_id,
                        username: data.customer_name,
                        phoneNumber: data.phone_no,
                        review: data.star,
                        comment: data.comment,
                        penalty: data.is_compensated,
                        date:  moment(data.created_at).format("YYYY-MM-DD HH:mm"),
                        delivery_estimate: moment(data.order_delivery_estimate).format("YYYY-MM-DD HH:mm"),
                        delivered_at: moment(data.order_delivered_at).format("YYYY-MM-DD HH:mm"),
                    }
                })
                props.setEvent(value)
            })
        } else {
            getOrder(props.pagination, null).then((response)=>{
                let value = response.data.data.items.map((data: any)=>{
                    return{
                        id: data._id,
                        order_id: data._id,
                        order_no: data.order_no,
                        merchant: data.merchant,
                        office_name: data.office_name,
                        merchantId: data.merchant_id,
                        username: data.customer_name,
                        phoneNumber: data.phone_no,
                        review: data.star,
                        comment: data.comment,
                        penalty: data.is_compensated,
                        date:  moment(data.created_at).format("YYYY-MM-DD HH:mm"),
                        delivery_estimate: moment(data.order_delivery_estimate).format("YYYY-MM-DD HH:mm"),
                        delivered_at: moment(data.order_delivered_at).format("YYYY-MM-DD HH:mm"),
                    }
                })
                props.setEvent(value)
            })
        }

    },[props.pagination])

    const onClickPenalty = (data: ReviewUI) => {
        getConfig().then((response)=>{
            let penalty_amount = "600";
            response.data.data.forEach((element: any)=>{
                if(element.name=="penalty_amount"){
                    penalty_amount = element.value.toString()
                }
            })
            const compensateUser = () => {
                reviewCompensate(data.id).then((response)=>{
                    if(response.data.status_code === 0){
                        notification.success({
                            message: response.data.error,
                            description: response.data.message
                        })
                        window.location.reload()
                    }else {
                        notification.error({
                            message: response.data.error,
                            description: response.data.message
                        })
                    }
                })
            }
            IOModal.confirm({
                title: "Та уг хэрэглэгчид нөхөн төлбөр олгохдоо \n" +
                    "итгэлтэй байна уу?",
                content: <div className="text-center">Тийм дарснаар тухайн хэрэглэгчид {penalty_amount} U-point бэлэглэх болно</div>,
                okText: 'Тийм',
                onOk: args => {
                    IOModal.confirmForm({
                        title: 'Нууц үгээ оруулан баталгаажуулна уу',
                        okText: 'Болсон',
                        icon: undefined,
                        content: <PasswordContent handleFunction={compensateUser}/>,
                        okButtonProps: {form:'password-confirmation-form', htmlType: 'submit'},
                    });
                }
            });
        })
    }
    const onClickComment = (comment: string) => {
        IOModal.show({
            title: "Comment",
            content: <div className="d-flex justify-content-center">{comment}</div>,
            okButtonProps: {style: {display: 'none'}}
        });
    }

    const onClickOrder = (id: string) => {
        getOrderById(id).then((response)=>{
            console.log(response.data)
            const data = response.data.data
            IOModal.show({
                title: "Order details",
                content: <div className="row px-5"><OrderInfoTable data={{
                    id: id,
                    status: data.state,
                    order_no: data.order_no,
                    date: data.created_at,
                    items: data.items
                }} options={props.options}/></div>,
                width: '1200px'
            })
        })
        ;
    }

    const onClickMerchant = (id: number, name: string) => {
        navigate('/merchant/' + id.toString() + "/info", {
                    state:
                        {
                            headerTitle: "Merchant > " + name,
                            headerButton: "Block Merchant",
                            clickFunctionProps:
                                {
                                    title: 'Та уг мерчантыг блок хийхдээ итгэлтэй байна уу?',
                                    okText: 'Тийм',
                                    content: 'Тийм дарснаар тус мерчант нь апп дээр\n' +
                                                'харагдахгүй болно'
                                },
                            merchantId: id.toString()
                        }
                })
    }

    let columns: ColumnsType<ReviewUI> = [
        {
            title: '№',
            dataIndex: 'key',
            key: 'key',
            sorter: (a, b) => a.index- b.index,
            sortOrder: sortedInfo.columnKey === 'index' && sortedInfo.order,
        },
        {
            title: 'Order ID',
            dataIndex: 'order_id',
            key: 'orderInfo',
            sorter: (a, b) => a.orderInfo.id.localeCompare(b.orderInfo.id),
            sortOrder: sortedInfo.columnKey === 'orderId' && sortedInfo.order,
            render: (orderInfo: OrderInfoUI, record) => (
                <a style={{color: '#FFC800'}} onClick={()=>onClickOrder(record.order_id)}>{record.order_no}</a>
            )
        },
        {
            title: 'Merchant',
            dataIndex: 'merchant',
            key: 'merchant',
            sorter: (a, b) => a.merchant.localeCompare(b.merchant),
            sortOrder: sortedInfo.columnKey === 'merchant' && sortedInfo.order,
            render: (merchant: string, record) => (
                <a onClick={() => onClickMerchant(record.merchantId, merchant)} style={{color: '#FFC800'}}>{merchant}</a>
            )
        },
        {
            title: 'Оффис',
            dataIndex: 'office_name',
            key: 'office_name',
        },
        {
            title: 'User name',
            dataIndex: 'username',
            key: 'username',
            sorter: (a, b) => a.username.localeCompare(b.username),
            sortOrder: sortedInfo.columnKey === 'username' && sortedInfo.order,
        },
        {
            title: 'Phone number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'On Time',
            dataIndex: 'delivery_estimate',
            key: 'delivery_estimate',
            render: (delivery_estimate, record) => {
                if(delivery_estimate > record.delivered_at){
                    return (
                        <>Yes</>
                    )
                } else{
                    return(
                        <>No</>
                    )
                }
            }
        },
        {
            title: 'Review',
            dataIndex: 'review',
            key: 'review',
            sorter: (a, b) => a.review- b.review,
            sortOrder: sortedInfo.columnKey === 'review' && sortedInfo.order,
        },
        {
            title: 'Comment',
            dataIndex: 'comment',
            key: 'comment',
            // render: (comment: string) => (
            //     <a style={{color: '#FFC800'}} onClick={()=> {onClickComment(comment)}}>View</a>
            // )
        },
        {
            title: 'Is Compensated',
            dataIndex: 'penalty',
            key: 'penalty',
            render: (penalty: boolean, record) => {
                if (penalty){
                    return(<>Yes</>)
                } else{
                    return (
                        <>No</>
                    )
                }
            }
        },
    ];
    if (userRoles.report === "edit"){
        columns = [
            {
                title: '№',
                dataIndex: 'key',
                key: 'key',
                sorter: (a, b) => a.index- b.index,
                sortOrder: sortedInfo.columnKey === 'index' && sortedInfo.order,
            },
            {
                title: 'Order ID',
                dataIndex: 'order_id',
                key: 'orderInfo',
                sorter: (a, b) => a.orderInfo.id.localeCompare(b.orderInfo.id),
                sortOrder: sortedInfo.columnKey === 'orderId' && sortedInfo.order,
                render: (order_id: string, record) => (
                    <a style={{color: '#FFC800'}} onClick={()=>onClickOrder(record.order_id)}>{record.order_no}</a>
                )
            },
            {
                title: 'Merchant',
                dataIndex: 'merchant',
                key: 'merchant',
                sorter: (a, b) => a.merchant.localeCompare(b.merchant),
                sortOrder: sortedInfo.columnKey === 'merchant' && sortedInfo.order,
                render: (merchant: string, record) => (
                    <a onClick={() => onClickMerchant(record.merchantId, merchant)} style={{color: '#FFC800'}}>{merchant}</a>
                )
            },
            {
                title: 'Оффис',
                dataIndex: 'office_name',
                key: 'office_name',
            },
            {
                title: 'User name',
                dataIndex: 'username',
                key: 'username',
                sorter: (a, b) => a.username.localeCompare(b.username),
                sortOrder: sortedInfo.columnKey === 'username' && sortedInfo.order,
            },
            {
                title: 'Phone number',
                dataIndex: 'phoneNumber',
                key: 'phoneNumber',
            },
            {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
            },
            {
                title: 'On Time',
                dataIndex: 'delivery_estimate',
                key: 'delivery_estimate',
                render: (delivery_estimate, record) => {
                    if(delivery_estimate > record.delivered_at){
                        return (
                            <>Yes</>
                        )
                    } else{
                        return(
                            <>No</>
                        )
                    }
                }
            },
            {
                title: 'Review',
                dataIndex: 'review',
                key: 'review',
                sorter: (a, b) => a.review- b.review,
                sortOrder: sortedInfo.columnKey === 'review' && sortedInfo.order,
            },
            {
                title: 'Comment',
                dataIndex: 'comment',
                key: 'comment',
                // render: (comment: string) => (
                //     <a style={{color: '#FFC800'}} onClick={()=> {onClickComment(comment)}}>View</a>
                // )
            },
            {
                title: 'Penalty',
                dataIndex: 'penalty',
                key: 'penalty',
                render: (penalty: boolean, record) => {
                    if (penalty){
                        return(<>Received</>)
                    } else{
                        return (
                            <a style={{color: '#FFC800'}} onClick={() => {
                                onClickPenalty(record)
                            }}>Compensate</a>
                        )
                    }
                }
            },

        ];
    }
    const serviceTypeOptionsUIs: ReviewUI[] = props.data.map(
        (data: ReviewUI, index: number) => {
            return{
                ...data,
                key: index+1,
                index: index
            }
        }
    )

    return(
        <Table
            columns={columns}
            dataSource={serviceTypeOptionsUIs}
            className="table table-responsive"
            pagination={{
                pageSize: 10,
                total: props.pagination?.total_count,
                showSizeChanger: false,
                onChange: (_page: number)=>{
                    props.setPagination({
                        ...props.pagination,
                        page: _page
                    })
                }
        }}
            rowClassName="table-row"
        />
    )
}
