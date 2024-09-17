import {ReactComponent as ChartIcon} from "../../../../icons/chart.svg";
import {useLocation} from "react-router";
import {Link, useNavigate} from "react-router-dom";
import {getUserRoles, logout} from "../../../public/auth/services/auth.service";
import {useEffect, useState} from "react";
import {RoutesUI} from "./entity/routes.model";
import {RolesUI} from "../../../public/auth/entity/auth.model";

const routes: RoutesUI[] = [
    {
        name: 'Office',
        location: '/office',
        state: {
            headerTitle: "Office",
            headerButton: "Add new office",
            clickFunctionProps: {
                title: 'Please enter office information',
                okText: 'Add',
            }
        },
        path: 'office'
    },
    {
        name: 'Merchant',
        location: '/merchant',
        path: 'merchant',
        state: {
            headerTitle: "Merchant > List",
            headerButton: null
        }
    },
    {
        name: 'Data report',
        location: '/report',
        path: 'report',
        state: {
            headerTitle: "Data report",
            headerButton: null
        }
    },
    {
        name: 'Review',
        location: '/review',
        path: 'review',
        state: {
            headerTitle: "Review",
            headerButton: null
        }
    },
    {
        name: 'Roles',
        location: '/roles',
        path: 'roles',
        state: {
            headerTitle: "User Roles",
            headerButton: "Add Roles",
            clickFunctionProps: {
                title: 'Please enter roles',
                okText: 'Add',
            }
        }
    },
    {
        name: 'Dashboard',
        location: '/dashboard',
        path: 'dashboard',
        state: {
            headerTitle: "Dashboard",
            headerButton: null
        }
    }
]



export default function Sidebar() {
    const { pathname } = useLocation();
    const splitLocation = pathname.split("/");
    const [roles, setRoles] =useState<RolesUI>()
    const navigate = useNavigate();

    useEffect(()=>{
        const userRoles = getUserRoles()
        setRoles(userRoles)
    },[])



    return(
        <div
            className="sidebar sidebar-dark sidebar-main sidebar-expand-lg"
            style={{borderRadius: "0 40px 40px 0", backgroundColor: "#1e2335 !important"}}
        >
            <div
                className="sidebar-section pl-3"
                style={{ minHeight: "100vh"}}
            >
                <ul className="nav nav-sidebar" data-nav-type="accordion">
                    <div
                        className="col-sm-12 mt-7 mb-6"
                    >
                        <h1 className="font-weight-medium text-secondary">
                            Delivery
                        </h1>
                    </div>
                    {roles?.service === "none" ? <></> :
                        <>
                            {
                                splitLocation[1] === "service" ?
                                    <li className="nav-item">
                                        <Link to="/service" state={{
                                            headerTitle: "Service type",
                                            headerButton: null
                                        }} className="nav-link active">
                                            <ChartIcon stroke="#ffc800"/>
                                            <span className="h3 font-weight-medium ml-3">
                                        Service type
                                    </span>
                                        </Link>
                                    </li>
                                    :
                                    <li className="nav-item">
                                        <Link to="/service" state={{
                                            headerTitle: "Service type",
                                            headerButton: null
                                        }} className="nav-link">
                                            <ChartIcon/>
                                            <span className="h3 font-weight-medium ml-3">
                                        Service type
                                    </span>
                                        </Link>
                                    </li>
                            }
                        </>
                    }

                </ul>
                <ul className="nav nav-sidebar" data-nav-type="accordion" style={{paddingLeft: '2.5rem'}}>
                    {routes.map((data) => {
                        let liClassName;
                        if(data.path === splitLocation[1]){
                            liClassName = "nav-link active"
                        } else{
                            liClassName = "nav-link"
                        }
                        if (roles?.office === "none" && data.path === "office"){
                            return (
                                <></>
                            )
                        } else if (roles?.merchant === "none" && data.path === "merchant"){
                            return (
                                <></>
                            )
                        }else if (roles?.dataReport === "none" && data.path === "report"){
                            return (
                                <></>
                            )
                        }else if (roles?.report === "none" && data.path === "review"){
                            return (
                                <></>
                            )
                        }else if (roles?.roles === "none" && data.path === "roles"){
                            return (
                                <></>
                            )
                        }
                        if (roles?.office === "view" && data.path === "office"){
                            data.state.headerButton = null
                        } else if (roles?.merchant === "view" && data.path === "merchant"){
                            data.state.headerButton = undefined
                        }else if (roles?.dataReport === "view" && data.path === "report"){
                            data.state.headerButton = undefined
                        }else if (roles?.report === "view" && data.path === "review"){
                            data.state.headerButton = undefined
                        }else if (roles?.roles === "view" && data.path === "roles"){
                            data.state.headerButton = undefined
                        }
                        return(
                            <li className="nav-item" key={data.name}>
                                <Link to={data.location} state={data.state} className={liClassName}>
                                    <span className="h3 font-weight-medium">
                                        {data.name}
                                    </span>
                                </Link>
                            </li>
                        )
                    })}
                    {
                        roles?.userManagement === "none" ? <></>:
                            <>
                                {(splitLocation[1] === "user" || splitLocation[1] === "log") ?
                                    <li className="nav-item nav-item-submenu nav-item-open" style={{paddingLeft: '0'}}>
                                        <a className="nav-link active">
                                            <span className="h3 font-weight-medium text-active">User management</span>
                                        </a>
                                        <ul className="nav nav-group-sub" data-submenu-title="User management">
                                            {splitLocation[2] === "list" ?
                                                <li className="nav-item">
                                                    <Link to="/user/list" state={{
                                                        headerTitle: "User management",
                                                        headerButton: "Add admin"
                                                    }} className="nav-link active">
                                        <span className="h3 font-weight-medium">
                                            List
                                        </span>
                                                    </Link>
                                                </li>
                                                :
                                                <li className="nav-item">
                                                    {
                                                        roles?.userManagement === "view" ?
                                                            <Link to="/user/list" state={{
                                                                headerTitle: "User management",
                                                                headerButton: null,
                                                                clickFunctionProps: {
                                                                    title: 'Please enter admin information',
                                                                    okText: 'Add',
                                                                }
                                                            }} className="nav-link">
                                                                <span className="h3 font-weight-medium">
                                                                    List
                                                                </span>
                                                            </Link>
                                                            :
                                                            <Link to="/user/list" state={{
                                                                headerTitle: "User management",
                                                                headerButton: "Add admin",
                                                                clickFunctionProps: {
                                                                    title: 'Please enter admin information',
                                                                    okText: 'Add',
                                                                }
                                                            }} className="nav-link">
                                                                <span className="h3 font-weight-medium">
                                                                    List
                                                                </span>
                                                            </Link>
                                                    }
                                                </li>
                                            }
                                            {splitLocation[2] === "log" ?
                                                <li className="nav-item">
                                                    <Link to="/user/log" state={{
                                                        headerTitle: "User management > Action log",
                                                        headerButton: null
                                                    }} className="nav-link active">
                                        <span className="h3 font-weight-medium">
                                            Action Log
                                        </span>
                                                    </Link>
                                                </li>
                                                :
                                                <li className="nav-item">
                                                    <Link to="/user/log" state={{
                                                        headerTitle: "User management > Action log",
                                                        headerButton: null
                                                    }} className="nav-link">
                                        <span className="h3 font-weight-medium">
                                            Action Log
                                        </span>
                                                    </Link>
                                                </li>
                                            }
                                        </ul>
                                    </li>
                                    :
                                    <li className="nav-item nav-item-submenu" style={{paddingLeft: '0'}}>
                                        <a className="nav-link">
                                            <span className="h3 font-weight-medium text-secondary">User management</span>
                                        </a>
                                        <ul className="nav nav-group-sub" data-submenu-title="User management">
                                            {splitLocation[2] === "list" ?
                                                <li className="nav-item">
                                                    <Link to="/user/list" state={{
                                                        headerTitle: "User management",
                                                        headerButton: "Add admin"
                                                    }} className="nav-link active">
                                        <span className="h3 font-weight-medium">
                                            List
                                        </span>
                                                    </Link>
                                                </li>
                                                :
                                                <li className="nav-item">
                                                    {
                                                        roles?.userManagement === "view" ?
                                                            <Link to="/user/list" state={{
                                                                headerTitle: "User management",
                                                                headerButton: null,
                                                                clickFunctionProps: {
                                                                    title: 'Please enter admin information',
                                                                    okText: 'Add',
                                                                }
                                                            }} className="nav-link">
                                                                <span className="h3 font-weight-medium">
                                                                    List
                                                                </span>
                                                            </Link>
                                                            :
                                                            <Link to="/user/list" state={{
                                                                headerTitle: "User management",
                                                                headerButton: "Add admin",
                                                                clickFunctionProps: {
                                                                    title: 'Please enter admin information',
                                                                    okText: 'Add',
                                                                }
                                                            }} className="nav-link">
                                                                <span className="h3 font-weight-medium">
                                                                    List
                                                                </span>
                                                            </Link>
                                                    }
                                                </li>
                                            }
                                            {splitLocation[2] === "log" ?
                                                <li className="nav-item">
                                                    <Link to="/user/log" state={{
                                                        headerTitle: "User management > Action log",
                                                        headerButton: null
                                                    }} className="nav-link active">
                                        <span className="h3 font-weight-medium">
                                            Action Log
                                        </span>
                                                    </Link>
                                                </li>
                                                :
                                                <li className="nav-item">
                                                    <Link to="/user/log" state={{
                                                        headerTitle: "User management > Action log",
                                                        headerButton: null
                                                    }} className="nav-link">
                                        <span className="h3 font-weight-medium">
                                            Action Log
                                        </span>
                                                    </Link>
                                                </li>
                                            }
                                        </ul>
                                    </li>
                                }
                            </>
                    }
                    <div
                        className="col-sm-12 fixed-bottom ml-5 mb-5" style={{width: '11%'}}
                    >
                        <a onClick={()=>{
                            logout();
                            navigate('/auth/login');
                        }}>Logout</a>
                        <h4 className="font-weight-light text-secondary">
                            Web version: 1.0 (01)
                        </h4>
                    </div>
                </ul>
            </div>
        </div>
    )
}
