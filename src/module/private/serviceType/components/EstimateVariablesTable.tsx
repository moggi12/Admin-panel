import {Table} from "antd";
import {Action, ActionType} from "../../../../shared/utils/entity/utility.model";
import {IOModal} from "../../../../shared/utils/Modal/Modal";
import {EstimateVariablesUI} from "../entity/serviceType.model";
import {ColumnsType} from "antd/lib/table";
import {ReactComponent as EditIcon} from "../../../../shared/icons/edit-icon.svg";
import EditEstimateVariableModal from "./EditEstimateVariableModal";
import {getUserRoles} from "../../../public/auth/services/auth.service";
import {useParams} from "react-router";

export default function EstimateVariablesTable(props: { data: any }) {
    const userRoles = getUserRoles()
    let params = useParams()

    const onActionClick = (data: EstimateVariablesUI, action: Action) => {
        switch (action.type) {
            case ActionType.edit:
                IOModal.confirmForm({
                    title: 'Edit information',
                    okText: 'Edit',
                    cancelText: 'Close',
                    icon: undefined,
                    content: <EditEstimateVariableModal data={data} merchantId={params.merchantId}/>,
                    okButtonProps: {form:'edit-estimate-variable-form', htmlType: 'submit'},
                });
                break;
            default:
                break;
        }
    };

    console.log(props.data)

    let columns: ColumnsType<EstimateVariablesUI> = [
        {
            title: 'Categories',
            dataIndex: 'category',
            key: 'category'
        },
        {
            title: 'Estimates',
            dataIndex: 'estimates',
            key: 'estimates',
            render: (estimates: string) => (
                <>{estimates} minute(s)</>
            )
        },
        {
            title: 'Delivery Estimates',
            dataIndex: 'deliveryEstimate',
            key: 'deliveryEstimate',
            render: (deliveryEstimate: string) => (
                <>{deliveryEstimate} minute(s)</>
            )
        },
    ];

    if(userRoles.service === "edit"){
        columns = [
            {
                title: 'Categories',
                dataIndex: 'category',
                key: 'category'
            },
            {
                title: 'Take away estimates',
                dataIndex: 'estimates',
                key: 'estimates',
                render: (estimates: string) => (
                    <>{estimates} minute(s)</>
                )
            },
            {
                title: 'Delivery estimates',
                dataIndex: 'deliveryEstimate',
                key: 'deliveryEstimate',
                render: (deliveryEstimate: string) => (
                    <>{deliveryEstimate} minute(s)</>
                )
            },
            {
                title: "Action",
                dataIndex: "actions",
                key: "actions",
                align: "center",
                render: (actions: Action[], record) => (
                    <div className="list-icons">
                        {actions?.map((action) => (
                            <a className="list-icons-item" onClick={() => onActionClick(record, action)}>
                                {action.element}
                            </a>
                        ))}
                    </div>
                ),
            },
        ];
    }

    const serviceTypeOptionsUIs: EstimateVariablesUI[] = props.data.map(
        (data: EstimateVariablesUI, index: number) => {
            const actions: Action[] =[
                { icon: "icon-pencil7", element: <EditIcon />, type: ActionType.edit },
            ];
            return{
                ...data,
                actions: actions,
                key: index,
            }
        }
    )

    return(
        <Table
            columns={columns}
            dataSource={serviceTypeOptionsUIs}
            className="table table-responsive"
            pagination={{hideOnSinglePage: true}}
            rowClassName="table-row"
        />
    )
}