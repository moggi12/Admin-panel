import {Input, Modal} from "antd";
import {useForm} from "antd/lib/form/Form";
import {MerchantUI} from "../entity/office.model";

export default function EditMerchantModal(props: {data?:MerchantUI|undefined}) {
    const [form] = useForm();
    console.log(props.data)

    const onFinish = (values: any) => {
        console.log(values);
        Modal.destroyAll();
    };
    return(
        <>
            <div className="row">
                <div className="col-md-4">
                    <p>{props.data?.name}:</p>
                </div>
                <div className="col-md-8">
                    <Input/>
                </div>
            </div>
        </>
    )
}