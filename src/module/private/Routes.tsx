import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Office from "./office/screen/Office";
import Sidebar from "./componenets/Sidebar/Sidebar";
import Header from "./componenets/Header/Header";
import ServiceTypeIndex from "./serviceType/screen/ServiceTypeIndex";
import MerchantIndex from "./merchant/screen/MerchantIndex";
import UserList from "./userManagement/screen/UserList";
import UserLog from "./userManagement/screen/UserLog";
import ServiceTypeEdit from "./serviceType/screen/ServiceTypeEdit";
import MerchantInfo from "./merchant/screen/MerchantInfo";
import ReviewIndex from "./review/screen/ReviewIndex";
import "./componenets/css/FormItem.css";
import {
	authenticationCheck,
	getCurrentUser,
	getRoleInfo,
	getRoles,
} from "../public/auth/services/auth.service";
import UserRoles from "./roles/screen/UserRoles";
import { RolesUI } from "../public/auth/entity/auth.model";
import HomePage from "./index/screens/HomePage";
import Dashboard from "./dashboard/screen/Dashboard";

export default function PrivateRoutes() {
	const isAuthenticated = authenticationCheck();
	const navigate = useNavigate();
	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/auth/login");
		} else {
			getRoles().then((response) => {
				let service: string = "none";
				let office: string = "none";
				let merchant: string = "none";
				let configure: string = "none";
				let dataReport: string = "none";
				let report: string = "none";
				let recommendation: string = "none";
				let userManagement: string = "none";
				let roles: string = "none";
				response.data.data.scopes.forEach((element: string) => {
					let elementArray = element.split("_");
					if (elementArray[1] === "service") {
						service = elementArray[0];
					} else if (elementArray[1] === "office") {
						office = elementArray[0];
					} else if (elementArray[1] === "merchant") {
						merchant = elementArray[0];
					} else if (elementArray[1] === "configure") {
						configure = elementArray[0];
					} else if (elementArray[1] === "dataReport") {
						dataReport = elementArray[0];
					} else if (elementArray[1] === "report") {
						report = elementArray[0];
					} else if (elementArray[1] === "recommendation") {
						recommendation = elementArray[0];
					} else if (elementArray[1] === "userManagement") {
						userManagement = elementArray[0];
					} else if (elementArray[1] === "roles") {
						roles = elementArray[0];
					}
				});
				let rolesList: RolesUI = {
					service: service,
					office: office,
					merchant: merchant,
					configure: configure,
					dataReport: dataReport,
					report: report,
					recommendation: recommendation,
					userManagement: userManagement,
					roles: roles,
				};
				localStorage.setItem("userRoles", JSON.stringify(rolesList));
			});
		}
	});
	return (
		<>
			<div className="page-content">
				<Sidebar />
				<div className="content">
					<Header />
					<div className="content-body">
						<Routes>
							<Route path="" element={<HomePage />} />
							<Route path="/office" element={<Office />} />
							<Route path="service">
								<Route path="" element={<ServiceTypeIndex />} />
								<Route path=":key/edit" element={<ServiceTypeEdit />} />
							</Route>
							<Route path="/merchant">
								<Route path="" element={<MerchantIndex />} />
								<Route path=":merchantId/info" element={<MerchantInfo />} />
							</Route>
							<Route path="user">
								<Route path="list" element={<UserList />} />
								<Route path="log" element={<UserLog />} />
							</Route>
							<Route path="review" element={<ReviewIndex />} />
							<Route path="roles" element={<UserRoles />} />
							<Route path="dashboard" element={<Dashboard />} />
						</Routes>
					</div>
				</div>
			</div>
		</>
	);
}
