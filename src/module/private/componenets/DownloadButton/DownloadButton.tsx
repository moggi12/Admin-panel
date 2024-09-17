import {ReactComponent as DownloadIcon} from "../../../../shared/icons/upload-icon.svg";
import "../DateFilter/DateFilter.css"

export default function DownloadButton(props: {handleDownload: any}) {
    const onClickDownload = () => {

        props.handleDownload()
    }
    return(
        <div className="px-2">
            <div className="paper">
                <DownloadIcon onClick={onClickDownload}/>
            </div>
        </div>

    )
}