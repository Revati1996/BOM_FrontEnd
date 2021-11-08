import React, { Fragment, useEffect, useState } from 'react';
import "./AccountDetails.css";
import axios from 'axios'
const AccountDetails = props => {

    const [accountDetailsDto, setAccountDetails] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("/accounts-api/accounts/"+localStorage.getItem("accountNumber"));
        setAccountDetails(result.data.data);
    };

    return (
        
        <div>
            <Fragment>
                <Fragment>
                    <h2 style={{ color: "white" }}>Customer Account Details</h2>
                    <hr style={{ height: "2px", color: "gray", backgroundColor: "white", borderWidth: "0" }}></hr>
                </Fragment>
                {accountDetailsDto.map((accountDetails, index) => (
                    <div className="bootstrap snippets bootdey">
                        <div className="panel-body inf-content account-pannel-details">
                            <div className="row" style={{ padding: "10px" }}>
                                <div className="col-md-12">
                                    <div className="panel">
                                        <div className="panel-body bio-graph-info">
                                            <h1>Customer Profile</h1>
                                            <div className="row">
                                                <div className="bio-row">
                                                    <p><span>CUSTOMER NAME</span>: {accountDetails.cust_name}</p>
                                                </div>
                                                
                                                <div className="bio-row">
                                                    <p><span>ACCOUNT NUMBER</span>: {accountDetails.account_Number}</p>
                                                </div>
                                                {/* <div className="bio-row">
                                                    <p><span>ACCOUNT TYPE </span>: {accountDetails.account_Number}</p>
                                                </div> */}
                                                <div className="bio-row">
                                                    <p><span>ACCOUNT BALANCE</span>: {accountDetails.account_Balance}</p>
                                                </div>
                                                <div className="bio-row">
                                                    <p><span>CREDIT SCORE </span>: {accountDetails.credit_score}</p>
                                                </div>
                                                <div className="bio-row">
                                                    <p><span>ADDRESS </span>: {accountDetails.address}</p>
                                                </div>
                                                <div className="bio-row">
                                                    <p><span>EMAIL </span>: {accountDetails.email}</p>
                                                </div>
                                                <div className="bio-row">
                                                    <p><span>PAN NUMBER </span>: {accountDetails.pan_Number}</p>
                                                </div>
                                                <div className="bio-row">
                                                    <p><span>PHONE NUMBER </span>: {accountDetails.phone_number}</p>
                                                </div>
                                                <div className="bio-row">
                                                    <p><span>USERNAME </span>: {accountDetails.username}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Fragment>
        </div>
    );
};

export default AccountDetails;