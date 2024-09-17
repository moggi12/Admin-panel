import {Dropdown} from "antd";
import {ReactComponent as FilterSortIcon} from "../../../../shared/icons/filter-icon.svg";

export default function FilterSort(props: {menu: any}) {
    return(
        <>
            <Dropdown placement="bottomRight"  overlay={props.menu} className="px-2">
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    <div className="paper">
                        <FilterSortIcon />
                    </div>
                </a>
            </Dropdown>
        </>
    )
}