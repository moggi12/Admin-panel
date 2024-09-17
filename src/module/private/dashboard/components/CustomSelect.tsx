import { Select, SelectProps } from "antd";
import './CustomSelect.less';

export default function CustomSelect<T>(props: SelectProps<T>) {
    return (
        <Select
            {...props}
            suffixIcon={<i className="toki-icon toki-icon-Down-arrow-7" />}
        />
    );
}
