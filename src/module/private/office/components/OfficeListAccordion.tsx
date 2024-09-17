import {Collapse, notification} from 'antd';
import MerchantTable from "./MerchantTable";
import {ReactComponent as DeleteIcon} from "../../../../shared/icons/delete-icon.svg";
import {ReactComponent as EditIcon} from "../../../../shared/icons/edit-icon.svg";
import {IOModal} from "../../../../shared/utils/Modal/Modal";
import EditOfficeModal from "./EditOfficeModal";
import {OfficeUI} from "../entity/office.model";
import PasswordContent from "../../componenets/PasswordModal/PasswordModal";
import {deleteOffice} from "../services/office.service";
import {getUserRoles} from "../../../public/auth/services/auth.service";

const { Panel } = Collapse;
const userRoles = getUserRoles()

const AccordionHeader = (props: any) => {
    let number = props.index + 1
    function handleDeleteOffice() {
        deleteOffice(props.data.id).then((response)=>{
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
    const onEditClick = (data: OfficeUI) => {
        IOModal.confirmForm({
            title: 'Please enter office information',
            okText: 'Зөвшөөрөх',
            icon: undefined,
            cancelText: 'Close',
            content: <EditOfficeModal data={data}/>,
            okButtonProps: {form:'edit-office-form', htmlType: 'submit'},
        });
    }
    const onDeleteClick = () => {
        IOModal.confirm({
            title: 'Та бүтээгдэхүүнийг устгахдаа итгэлтэй байна уу?',
            okText: 'Зөвшөөрөх',
            icon: undefined,
            onOk: args => {
                IOModal.confirmForm({
                    title: 'Нууц үгээ оруулан баталгаажуулна уу',
                    okText: 'Болсон',
                    icon: undefined,
                    content: <PasswordContent handleFunction={handleDeleteOffice}/>,
                    okButtonProps: {form:'password-confirmation-form', htmlType: 'submit'},
                });
            }
        });
    }
    if (userRoles.office === "edit"){
        return(
            <div className="row" style={{width: '100%'}}>
                <div className="col-md-1" style={{borderRight: '1px solid #B3BFC6'}}>
                    <h3>№ {number}</h3>

                </div>
                <div className="col-md-3" style={{borderRight: '1px solid #B3BFC6'}}>
                    <h3>{props.data.name}</h3>
                </div>
                <div className="col-md-5" style={{borderRight: '1px solid #B3BFC6'}}>
                    <h3>{props.data.location.longitude} , {props.data.location.latitude}</h3>
                </div>
                <div className="col-md-3 d-flex justify-content-end" onClick={e => e.stopPropagation()}>
                    <EditIcon onClick={()=>onEditClick(props.data)}/>
                    <DeleteIcon style={{marginLeft: '10px', marginRight: '10px'}} onClick={onDeleteClick}/>
                </div>
            </div>
        )
    } else{
        return(
            <div className="row" style={{width: '100%'}}>
                <div className="col-md-1" style={{borderRight: '1px solid #B3BFC6'}}>
                    <h3>№ {number}</h3>

                </div>
                <div className="col-md-3" style={{borderRight: '1px solid #B3BFC6'}}>
                    <h3>{props.data.name}</h3>
                </div>
                <div className="col-md-5" style={{borderRight: '1px solid #B3BFC6'}}>
                    <h3>{props.data.location.longitude} , {props.data.location.latitude}</h3>
                </div>
            </div>
        )
    }

}

export default function OfficeListAccordion(props: any) {
    return(
        <>
            <Collapse>
                {props.data.map((data: any, index: number)=>(
                    <Panel header={<AccordionHeader data={data} index={index}/>} key={data.index}>
                        {data.merchant ? <MerchantTable data={data.merchant}/> : <></>}
                    </Panel>
                ))}
            </Collapse>
        </>
    )
}