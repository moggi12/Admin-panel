import React from "react";
import { useForm } from "antd/lib/form/Form";
import moment, { Moment } from "moment";
import {TimeTableDto} from "../entity/merchant.model";
import {Form, notification, Select, TimePicker} from "antd";
import {
    updateMerchantDeliveryTimeTable,
    updateMerchantTakeAwayTimeTable
} from "../../serviceType/services/service.service";

export interface TimeTableProps {
    timetable?: TimeTableDto | any;
    merchantId?: string
    type?: string
}

export const translateDay = (day: number) => {
    switch (day) {
        case 1:
            return "Даваа";
        case 2:
            return "Мягмар";
        case 3:
            return "Лхагва";
        case 4:
            return "Пүрэв";
        case 5:
            return "Баасан";
        case 6:
            return "Бямба";
        case 7:
            return "Ням";
        default:
            break;
    }
};

const {Option} = Select;

export default function TimeTable(props: TimeTableProps) {
    const [form] = useForm();
    console.log(props.merchantId)

    const onFinish = (values: any) => {
        let data = values.timeTable.map((value: any)=>{
            let start_hour: Moment = moment(value.timeField[0], "HH:mm");
            let end_hour: Moment = moment(value.timeField[1], "HH:mm");
            return  {
                day: value.day,
                start_hour: start_hour.format("HH:mm"),
                end_hour: end_hour.format("HH:mm"),
                closed: value.closed
            };
        })
        if (props.type === "takeAway"){
            updateMerchantTakeAwayTimeTable(props.merchantId,data).then((response) => {
                if(response.data.status_code === 0){
                    window.location.reload()
                }else {
                    notification.error({
                        message: response.data.error,
                        description: response.data.message
                    })
                }
            });
        } else {
            updateMerchantDeliveryTimeTable(props.merchantId,data).then((response) => {
                if(response.data.status_code === 0){
                    window.location.reload()
                }else {
                    notification.error({
                        message: response.data.error,
                        description: response.data.message
                    })
                }
            });
        }


    }

    return (
        <Form
            className="form-horizontal"
            onFinish={onFinish}
            form={form}
            name="edit-delivery-timetable-form"
        >
            <Form.List name="timeTable" initialValue={props.timetable}>
                {(fields, { add, remove }) => (
                        <>
                            {fields.map((field, index) => {
                                return(
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right">
                                            {translateDay(props.timetable[index].day)}
                                        </label>
                                        <div className="col-sm-5">
                                            <Form.Item name={[field.name, "timeField"]}
                                                       initialValue={[moment(props.timetable[index].start_hour, "HH:mm"), moment(props.timetable[index].end_hour, "HH:mm")]}
                                            >
                                                <TimePicker.RangePicker className="form-control" format="HH:mm" />
                                            </Form.Item>
                                        </div>
                                        <div className="col-sm-4">
                                            <Form.Item name={[field.name, "closed"]} initialValue={props.timetable[index].closed}>
                                                <Select>
                                                    <Option value={true}>Active</Option>
                                                    <Option value={false}>Disabled</Option>
                                                </Select>
                                            </Form.Item>
                                        </div>
                                    </div>
                                )
                            }


                            )}
                        </>
                )}
            </Form.List>
        </Form>
    );
}
