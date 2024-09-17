import {notification, Table} from "antd";
import {Action, ActionType} from "../../../../shared/utils/entity/utility.model";
import {IOModal} from "../../../../shared/utils/Modal/Modal";
import {ConfigurationsUI} from "../entity/serviceType.model";
import {ColumnsType} from "antd/lib/table";
import {ReactComponent as EditIcon} from "../../../../shared/icons/edit-icon.svg";
import EditConfigurationModal from "./EditConfigurationModal";
import {getUserRoles} from "../../../public/auth/services/auth.service";
import {useParams} from "react-router";
import TimeTable from "../../merchant/components/TimeTable";

export default function ConfigurationsTable(props: { data: any, isDelivery?: any, isTakeAway?: any }) {
    const userRoles = getUserRoles()
    let {merchantId} = useParams()

    const onClickView = () => {
        IOModal.confirmForm({
            title: 'Edit information',
            okText: 'Edit',
            cancelText: 'Close',
            icon: undefined,
            width: '600px',
            content: <TimeTable timetable={props.isDelivery} merchantId={merchantId}/>,
            okButtonProps: {form:'edit-delivery-timetable-form', htmlType: 'submit'},
        });
    }

    const onClickViewTakeAway = () => {
        IOModal.confirmForm({
            title: 'Edit information',
            okText: 'Edit',
            cancelText: 'Close',
            icon: undefined,
            width: '600px',
            content: <TimeTable timetable={props.isTakeAway} merchantId={merchantId} type={"takeAway"}/>,
            okButtonProps: {form:'edit-delivery-timetable-form', htmlType: 'submit'},
        });
    }

    const onActionClick = (data: ConfigurationsUI, action: Action) => {
        switch (action.type) {
            case ActionType.edit:
                IOModal.confirmForm({
                    title: 'Edit information',
                    okText: 'Edit',
                    cancelText: 'Close',
                    icon: undefined,
                    content: <EditConfigurationModal data={data} merchantId={merchantId}/>,
                    okButtonProps: {form:'edit-configuration-form', htmlType: 'submit'},
                });
                break;
            case ActionType.delete:
                IOModal.confirm({
                    title: 'Та бүтээгдэхүүнийг устгахдаа итгэлтэй байна уу?',
                    okText: 'Зөвшөөрөх',
                    icon: undefined,
                });
                break;
            case ActionType.hide:
                IOModal.confirm({
                    title: 'Та бүтээгдэхүүнийг нуухдаа итгэлтэй байна уу?',
                    okText: 'Зөвшөөрөх',
                    icon: undefined,
                });
                break;
            default:
                break;
        }
    };

    let columns: ColumnsType<ConfigurationsUI> = [
        {
            title: 'Factors',
            dataIndex: 'factor',
            key: 'factor',
            render: (factor)=>{
                let factorTextList = factor.split("_")
                let factorText:string = ""
                factorTextList.forEach((element:string)=>{
                    factorText += element.charAt(0).toUpperCase() + element.slice(1) + " "
                })
                return(
                    <>{factorText}</>
                )
            }
        },
        {
            title: 'Measurement',
            dataIndex: ['measurement', 'measurementType'],
            key: 'measurement',
            render: (text: any, row:any) => (
                <>
                    {row['measurement']} {row['measurementType']}
                </>
            )
        },
    ];

    if(userRoles.configure === "edit"){
        columns = [
            {
                title: 'Factors',
                dataIndex: 'factor',
                key: 'factor',
                render: (factor)=>{
                    let factorTextList = factor.split("_")
                    let factorText:string = ""
                    factorTextList.forEach((element:string)=>{
                        factorText += element.charAt(0).toUpperCase() + element.slice(1) + " "
                    })
                    return(
                        <>{factorText}</>
                    )
                }
            },
            {
                title: 'Measurement',
                dataIndex: ['measurement', 'measurementType'],
                key: 'measurement',
                render: (text: any, row:any) => {
                    if(row['factor'] ==="Delivery"){
                        return (
                            <a onClick={onClickView} style={{color: '#ffc800'}}>View</a>
                        )
                    }
                    if(row['factor'] ==="Take Away"){
                        return (
                            <a onClick={onClickViewTakeAway} style={{color: '#ffc800'}}>View</a>
                        )
                    }
                    return(
                    <>
                        {row['measurement']} {row['measurementType']}
                    </>
                )}
            },
            {
                title: "Action",
                dataIndex: "action",
                key: "key",
                align: "center",
                render: (action: Action[], record) => (
                    <div className="list-icons">
                        {action?.map((action) => (
                            <a className="list-icons-item" onClick={() => onActionClick(record, action)}>
                                {action.element}
                            </a>
                        ))}
                    </div>
                ),
            },

        ];
    }
    const actions: Action[] =[
        { icon: "icon-pencil7", element: <EditIcon />, type: ActionType.edit },
    ];

    const serviceTypeOptionsUIs: ConfigurationsUI[] = [];
        props.data.forEach(
        (data: ConfigurationsUI, index: number) => {
            if (merchantId === undefined){
                if (data.factor === 'max_recommendation' && userRoles.recommendation === 'view'){
                    serviceTypeOptionsUIs.push({
                        ...data,
                        key: index,
                    })
                } else if (data.factor === 'max_recommendation' && userRoles.recommendation === 'none'){

                } else {
                    serviceTypeOptionsUIs.push({
                        ...data,
                        action: actions,
                        key: index,
                    })
                }
            } else {
                if(data.factor !== 'location_range'){
                    serviceTypeOptionsUIs.push({
                        ...data,
                        action: actions,
                        key: index,
                    })
                }
            }

        }
    )
    // if(userRoles.recommendation === 'view'){
    //     serviceTypeOptionsUIs.push({
    //
    //     })
    // } else{
    //     serviceTypeOptionsUIs.push({
    //         measurement: ""
    //         action: actions,
    //         key: 99999,
    //     })
    // }
    if(props.isDelivery !== undefined){
        let measurement = "Disabled"
        if(props.isDelivery){
            measurement = "Active"
        }
        if(userRoles.recommendation === 'view'){
            serviceTypeOptionsUIs.push({
                id: "99999",
                factor: "Delivery",
                measurementType: "",
                measurement: measurement,
                key: 99999,
                isDelivery: props.isDelivery,
            })
            }
        else{
            serviceTypeOptionsUIs.push({
                id: "isDelivery",
                factor: "Delivery",
                measurementType: "",
                measurement: measurement,
                key: 99999,
                isDelivery: props.isDelivery,
            })
        }

    }

    if(props.isTakeAway !== undefined){
        let measurement = "Disabled"
        if(props.isTakeAway){
            measurement = "Active"
        }
        if(userRoles.recommendation === 'view'){
            serviceTypeOptionsUIs.push({
                id: "99999",
                factor: "Take Away",
                measurementType: "",
                measurement: measurement,
                key: 99999,
                isDelivery: props.isTakeAway,
            })
        }
        else{
            serviceTypeOptionsUIs.push({
                id: "isDelivery",
                factor: "Take Away",
                measurementType: "",
                measurement: measurement,
                key: 99999,
                isDelivery: props.isTakeAway,
            })
        }

    }




    return(
        <Table
            columns={columns}
            dataSource={serviceTypeOptionsUIs}
            className="table table-responsive"
            pagination={false}
            rowClassName="table-row"
        />
    )
}
