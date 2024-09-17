import {Input} from "antd";
import './SearchBar.css';
import {ReactComponent as SearchIcon} from "../../../../icons/search.svg";

export default function SearchBar(props: { onSearch: any; placeholder: any }) {
    return(
        <div className="search-bar">
            <Input.Search size="large"
                          onSearch={props.onSearch}
                          placeholder={props.placeholder}
                          prefix={<SearchIcon width="25" height="25"/>}
                          style={{borderRadius: '10px', border: 'none', height: '50px'}}
            />
        </div>
    )
}