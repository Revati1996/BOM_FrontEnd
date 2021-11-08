import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios'
import { Link } from 'react-router-dom';

import './LoginComponent.css';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            redirectToReferrer: false,
            message: "",
            formErrors: { username: "", password: "" },
            usernameValid: false,
            passwordValid: false,
            formValid: false,
            islogged: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
        this.cancelData = this.cancelData.bind(this);
    }

    cancelData() {
        this.setState({
            username: "",
            password: "",
            redirectToReferrer: false,
            message: "",
            islogged: true,
            formErrors: { username: "", password: "" },
            usernameValid: false,
            passwordValid: false,
            formValid: false,
        });
        
    }


    login(e) {
        e.preventDefault();

        const data = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post("/auth-api/auth/login", data).then(res => {
            if (res.data.code === 200) {
                localStorage.setItem('custName', res.data.data.custName);
                localStorage.setItem('custId', res.data.data.custId);
                localStorage.setItem("token", res.data.data.token);
                localStorage.setItem("username", res.data.data.username);
                localStorage.setItem("accountNumber", res.data.data.accountNumber);
                this.setState({
                    islogged: true
                });
            }
        }).catch(err => {
            this.setState({
                message: "Username / Password is invalid"
            });
        })
    }

    handleChange(e) {
        const id = e.target.id;
        const value = e.target.value;
        this.setState({ [id]: value }, () => {
            this.validateField(id, value);
        });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let { usernameValid, passwordValid } = this.state;

        switch (fieldName) {
            case "username":
                usernameValid = value.length >= 6;
                fieldValidationErrors.username = usernameValid ? '' : 'Username is invalid';
                break;
            case "password":
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '' : 'Password is too short';
                break;
            default:
                break;
        }

        this.setState({
            formErrors: fieldValidationErrors,
            usernameValid: usernameValid,
            passwordValid: passwordValid,
            formValid: usernameValid && passwordValid
        });
    }


    render() {

        if (localStorage.getItem("token")) {
            return <Redirect to="/" />;
        }
        return (

            <>
                <div className="container">
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
                                        <div className="panel panel-default">
                                            <div className="panel-heading">
                                                <h3 className="panel-title" style={{ padding: "10px" }}>Cutomer Login <small></small></h3>
                                            </div>
                                            {this.state.message ? <h4 className="alert alert-danger">{this.state.message}</h4> : null}
                                            <div className="panel-body">
                                                <Form style={{ padding: "10px" }} onSubmit={this.login}>

                                                    <Form.Group controlId="username">
                                                        <Form.Control autoFocus type="text" value={this.state.username}
                                                            onChange={this.handleChange} placeholder="User Name" />
                                                        {
                                                            this.state.formErrors.username
                                                                ? <Form.Text className="text-danger">{this.state.formErrors.username}</Form.Text>
                                                                : null
                                                        }
                                                    </Form.Group>

                                                    <Form.Group controlId="password">
                                                        <Form.Control type="password" value={this.state.password}
                                                            onChange={this.handleChange} placeholder="Password" />
                                                        {
                                                            this.state.formErrors.password
                                                                ? <Form.Text className="text-danger">{this.state.formErrors.password}</Form.Text>
                                                                : null
                                                        }
                                                    </Form.Group>
                                                    <div className="row">
                                                        <div className="col-xs-6 col-sm-6 col-md-6">
                                                            <div className="form-group">
                                                                <Button block type="submit" value="Login" className="btn btn-info btn-block" disabled={!this.state.formValid}>
                                                                    Login
                                                                </Button>
                                                            </div>
                                                        </div>
                                                        <div className="col-xs-6 col-sm-6 col-md-6">
                                                            <div className="form-group">


                                                                <input type="button" value="Cancel" onClick={this.cancelData} className="btn btn-danger btn-block" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default Login;
