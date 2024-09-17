import {EmployeeListUI, MerchantInformationTableUI, MerchantInformationUI, TimeTableUI} from "../entity/merchant.model";
import {ColumnsType} from "antd/lib/table";
import {Table} from "antd";
import {IOModal} from "../../../../shared/utils/Modal/Modal";
import EmployeeListTable from "./EmployeeListTable";

export default function MerchantInformationTable(props: { data: MerchantInformationUI }) {

    const columns: ColumnsType<MerchantInformationTableUI> = [
        {
            title: 'Information',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'key',
        },
    ];

    let uPointText = "Байхгүй";
    if (props.data.uPoint){
        uPointText = props.data.uPoint;
    }

    const onClickTimeTable = (data: TimeTableUI[]) => {
        IOModal.show({
            title: 'Time Table',
            content: <div className="row px-5">{data.map((time)=>(
                <div className="col-md-12 py-2">
                    <div className="row">
                        <div className="col-md-6">
                            {time.name}
                        </div>
                        <div className="col-md-6">
                            {time.active ? "Амарна" : <div>{time.startDate} - {time.endDate}</div>}
                        </div>
                    </div>

                </div>
            ))}</div>
        });
    }

    const onClickEmployeeList = (data: EmployeeListUI[]) => {
        IOModal.show({
            content: <div><EmployeeListTable data={data} merchantId={props.data.id}/></div>,
            width: "1200px",
        });
    }


    const dataUIs: MerchantInformationTableUI[] = [
        {
            index: 0,
            name: "Бизнесийн нэр",
            value: props.data.name
        },
        {
            index: 1,
            name: "E-mail хаяг",
            value: props.data.email
        },
        {
            index: 2,
            name: "Timetable",
            value: <a style={{color: '#FFC800'}} onClick={()=>onClickTimeTable(props.data.timetable)}>View</a>
        },
        {
            index: 3,
            name: "Employee list",
            value: <a style={{color: '#FFC800'}} onClick={()=>onClickEmployeeList(props.data.employeeList)}>View</a>
        },
        {
            index: 4,
            name: "Оффис",
            value: props.data.office.map((data)=>(<>{data}</>))
        },
        {
            index: 5,
            name: "Өнгөний код",
            value: props.data.colorCode
        },
        {
            index: 6,
            name: "U-point token",
            value: uPointText
        },
        {
            index: 7,
            name: "Toki SPOC",
            value: props.data.tokiSpoc
        },
    ]

    return(
        <Table
            columns={columns}
            dataSource={dataUIs}
            className="table table-responsive"
            pagination={{hideOnSinglePage: true}}
            rowClassName="table-row"
        />
    )
}