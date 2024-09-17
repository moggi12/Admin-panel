import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./auth/screen/Login";

export default function PublicRoutes() {
    return (
        <div className="page-content">
            {/* Main content */}
            <div className="content-wrapper">
                <div className="row">
                    <div className="col-sm-12">
                        {/* Content area */}
                        <div
                            className="content d-flex justify-content-center align-items-center"
                            style={{ minHeight: "100vh" }}
                        >
                            <Routes>
                                <Route path="/login" element={<Login />} />
                                <Route path="/login/:token" element={<Login />} />
                            </Routes>
                        </div>
                        {/* /content area */}
                    </div>
                    {/* /main content */}
                </div>
            </div>
        </div>
    );
}