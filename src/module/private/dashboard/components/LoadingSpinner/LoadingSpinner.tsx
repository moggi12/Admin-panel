import React from "react";
import "./spinner.css";

export default function LoadingSpinner() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
        }}>
            <div className="spinner-container">
                <div className="loading-spinner">
                </div>
            </div>
        </div>

    );
}
