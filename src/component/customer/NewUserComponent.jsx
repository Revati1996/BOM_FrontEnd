import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import axios from 'axios'
import './NeWUserComponent.css';
const NewUserComponent = () => {

    const [newUserObj, setNewUserObj] = useState({
        first_name: "",
        last_name: "",
        address: "",
        pan_number: "",
        phone_number: "",
        email: "",
        account_balance: "",
        username: "",
        password: ""
    });


    let history = useHistory();

    const [message, setMessage] = useState("");

    const { first_name, last_name, address, pan_number, phone_number, email, account_balance, username, password } = newUserObj;


    const onSubmit = async e => {
        e.preventDefault();
        await axios.post("/accounts-api/customer/registration", newUserObj).then(res => {
            console.info("Responce====>", res.status);
            console.info("Responce====>", res.data.message);
            if (res.status === 200) {
                setNewUserObj(res.data);
                setMessage(res.data.message);
                clearData();
            } else {
                setMessage("Error !...");
            }
        })
        history.push("/newuser");
    };

    const onInputChange = e => {
        setNewUserObj({ ...newUserObj, [e.target.name]: e.target.value });
    };

    const clearData = () => {
        setNewUserObj({
            first_name: "",
            last_name: "",
            address: "",
            pan_number: "",
            phone_number: "",
            email: "",
            account_balance: "",
            username: "",
            password: ""
        });
    }

    const cancelData = () => {
        setNewUserObj({
            first_name: "",
            last_name: "",
            address: "",
            pan_number: "",
            phone_number: "",
            email: "",
            account_balance: "",
            username: "",
            password: ""
        });
        setMessage("");

    }

    return (
        <>
            <div className="sidenav">
                <div className="login-main-text">
                    <h2>State Bank of Mysore</h2>
                    <p>Login or register from here to access.</p>
                </div>
            </div>
            <div className="login-main" style={{ paddingTop: "5px" }}>
                <div className="col-md-12 col-sm-12">
                    <div className="login-form">
                        <button className="btn btn-black">
                            <Link to='/' style={{ color: "white" }}>Login</Link>
                        </button>&nbsp;
                        <button className="btn btn-secondary">
                            <Link to='/newuser' style={{ color: "white" }}>New User</Link>
                        </button>
                    </div>
                    <hr style={{ height: "2px", color: "gray", backgroundColor: "white", borderWidth: "0" }}></hr>
                </div>
            </div>
            <div className="login-main">
                <div className="col-md-12 col-sm-12">
                    <div className="container">
                        <div className="row centered-form">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-sm-offset-2 col-md-offset-4">
                                {message ? <h4 className="alert alert-danger">{message}</h4> : null}
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h3 className="panel-title" style={{ padding: "10px" }}>Customer Registration</h3>
                                    </div>
                                    <div className="panel-body">
                                        <form style={{ padding: "10px" }} onSubmit={e => onSubmit(e)}>
                                            <div className="row">
                                                <div className="col-xs-6 col-sm-6 col-md-6">
                                                    <div className="form-group">
                                                        <input type="text"
                                                            name="first_name"
                                                            value={first_name}
                                                            onChange={e => onInputChange(e)}
                                                            className="form-control input-sm"
                                                            placeholder="First Name"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-xs-6 col-sm-6 col-md-6">
                                                    <div className="form-group">
                                                        <input type="text"
                                                            name="last_name"
                                                            value={last_name}
                                                            onChange={e => onInputChange(e)}
                                                            className="form-control input-sm"
                                                            placeholder="Last Name"
                                                            required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xs-12 col-sm-12 col-md-12">
                                                    <div className="form-group">
                                                        <textarea type="textArea"
                                                            name="address"
                                                            value={address}
                                                            onChange={e => onInputChange(e)}
                                                            className="form-control input-sm"
                                                            placeholder="Address" required />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="row">
                                                <div className="col-xs-6 col-sm-6 col-md-6">
                                                    <div className="form-group">
                                                        <input type="text"
                                                            name="pan_number"
                                                            value={pan_number}
                                                            onChange={e => onInputChange(e)}
                                                            className="form-control input-sm"
                                                            placeholder="Pan Number" required />
                                                    </div>
                                                </div>
                                                <div className="col-xs-6 col-sm-6 col-md-6">
                                                    <div className="form-group">
                                                        <input type="text"
                                                            name="phone_number"
                                                            value={phone_number}
                                                            onChange={e => onInputChange(e)}
                                                            className="form-control input-sm"
                                                            placeholder="Phone Number"
                                                            required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xs-6 col-sm-6 col-md-6">
                                                    <div className="form-group">
                                                        <input type="email"
                                                            name="email"
                                                            value={email}
                                                            onChange={e => onInputChange(e)}
                                                            className="form-control input-sm"
                                                            placeholder="Email" required />
                                                    </div>
                                                </div>
                                                <div className="col-xs-6 col-sm-6 col-md-6">
                                                    <div className="form-group">
                                                        <input type="text"
                                                            name="account_balance"
                                                            value={account_balance}
                                                            onChange={e => onInputChange(e)}
                                                            className="form-control input-sm"
                                                            placeholder="Account Opening Amount" required />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-xs-12 col-sm-12 col-md-12">
                                                    <div className="form-group">
                                                        <input type="text"
                                                            name="username"
                                                            value={username}
                                                            onChange={e => onInputChange(e)}
                                                            className="form-control input-sm"
                                                            placeholder="Username"
                                                            autocomplete="off"
                                                            required />
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="row">
                                                <div className="col-xs-6 col-sm-6 col-md-6">
                                                    <div className="form-group">
                                                        <input type="password"
                                                            name="password"
                                                            value={password}
                                                            onChange={e => onInputChange(e)}
                                                            className="form-control input-sm"
                                                            placeholder="Password" required />
                                                    </div>
                                                </div>
                                                <div className="col-xs-6 col-sm-6 col-md-6">
                                                    <div className="form-group">
                                                        <input type="password"
                                                            name="password_confirmation"
                                                            className="form-control input-sm"
                                                            placeholder="Confirm Password" required />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-xs-6 col-sm-6 col-md-6">
                                                    <div className="form-group">
                                                        <input type="submit" value="Register" className="btn btn-info btn-block" />
                                                    </div>
                                                </div>
                                                <div className="col-xs-6 col-sm-6 col-md-6">
                                                    <div className="form-group">
                                                        <input type="button" value="Cancel" onClick={cancelData} className="btn btn-danger btn-block" />
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewUserComponent;
