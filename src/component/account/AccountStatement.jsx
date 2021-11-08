import React, { Fragment, useState } from 'react';
import axios from 'axios'
import { useHistory } from "react-router-dom";
import "./AccountStatement.css";
// class AccountStatement extends Component {
const AccountStatement = () => {


    const [message, setMessage] = useState("");
    
    let history = useHistory();

    const [accountStatementDto, setAccountStatementDto] = useState([]);

    const [accountStatementObj, setaccountStatementObj] = useState({
        accNumber: localStorage.getItem("accountNumber"),
        sort: "",
        startDate: "",
        endDate: "",
        sortOrder: "Asc",
        limit: 10,
        offset:0

    });

    const {sort, startDate, endDate, sortOrder } = accountStatementObj;

    const cancelData = () => {
        setaccountStatementObj({
            accNumber: localStorage.getItem("accountNumber"),
            sort: "",
            startDate: "",
            endDate: "",
            sortOrder: "Asc",
            limit: 10,
            offset:0
        });
        setMessage("");
}

const clearData = () => {
    setaccountStatementObj({
        accNumber: localStorage.getItem("accountNumber"),
        sort: "",
        startDate: "",
        endDate: "",
        sortOrder: "Asc",
        limit: 10,
        offset:0
    });
}

    const onSubmit = async e => {
        e.preventDefault();
        await axios.post("/accounts-api/accounts/statement", accountStatementObj).then(res => {
            if (res.data.code === 200) {
                setAccountStatementDto(res.data.data);
                setMessage("Record Found !...");
                clearData();
            } else {
                setMessage("Record Not Found !...");
            }
        })
        history.push("/dashboard/accountStatement");
    };

    const onInputChange = e => {
        setaccountStatementObj({ ...accountStatementObj, [e.target.name]: e.target.value });
    };

    // render() {
    return (
        <div>
            <Fragment>
                <Fragment>
                    <h2 style={{ color: "white" }}>Account Statement Details</h2>
                    <hr style={{ height: "2px", color: "gray", backgroundColor: "white", borderWidth: "0" }}></hr>
                </Fragment>
                <div className="row centered-statement-form">
                    <div className="col-xs-12 col-sm-6 col-md-6 col-sm-offset-2 col-md-offset-4">
                        <div className="panel panel-default">
                        {message ? <h4 className="alert alert-danger">{message}</h4> : null}
                            <div className="panel-body">
                                <form style={{ padding: "10px" }} onSubmit={e => onSubmit(e)}>
                                    <div className="row">
                                        <div className="col-xs-6 col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <label>Account Number</label>
                                                <input type="text"
                                                    className="form-control input-sm"
                                                    placeholder="Account Number"
                                                    name="accNumber"
                                                    value={localStorage.getItem("accountNumber")}
                                                    onChange={e => onInputChange(e)}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                        <div className="col-xs-6 col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <label>Amount</label>
                                                <input type="number"
                                                    name="sort"
                                                    value={sort}
                                                    onChange={e => onInputChange(e)}
                                                    className="form-control input-sm"
                                                    placeholder="Enter Amount"
                                                    min="0"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-6 col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <label>Select start date</label>
                                                <input type="date"
                                                    name="startDate"
                                                    value={startDate}
                                                    onChange={e => onInputChange(e)}
                                                    className="form-control input-sm"
                                                    placeholder="Start Date" />
                                            </div>
                                        </div>
                                        <div className="col-xs-6 col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <label>Select end date</label>
                                                <input type="date"
                                                    name="endDate"
                                                    value={endDate}
                                                    onChange={e => onInputChange(e)}
                                                    className="form-control input-sm"
                                                    placeholder="Start Date" />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-xs-6 col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <label>Sort order</label>
                                                <select className="form-control"
                                                    name="sortOrder"
                                                    value={sortOrder}
                                                    onChange={e => onInputChange(e)}
                                                    required
                                                >
                                                    <option value="asc">Ascending Order</option>
                                                    <option value="desc">Descending Order</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-6 col-sm-6 col-md-6">
                                            <div className="form-group">
                                                <input type="submit" value="Submit" className="btn btn-info btn-block" />
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
                    <div className="col-xs-12 col-sm-6 col-md-6 col-sm-offset-2 col-md-offset-4">
                        <div className="panel panel-default" style={{ padding: "10px" }} >
                            <div className="panel-heading">
                                <h3 className="panel-title" style={{ padding: "10px" }}>Customes Account Transaction Details</h3>
                            </div>
                            <div className="panel-body">
                                <div className="py-0">
                                    <table className="table border shadow">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Account Number</th>
                                                 <th scope="col">Tran Id</th> 
                                                <th scope="col">Type</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Total balance</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {accountStatementDto.map((accountStatement, index) => (
                                                <tr>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{accountStatement.account_Number}</td>
                                                    <td>{accountStatement.tran_Id}</td>
                                                    <td>{accountStatement.tran_Type}</td>
                                                    <td>{accountStatement.amount}</td>
                                                    <td>{accountStatement.account_Balance}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div> </Fragment>
            <Fragment>

            </Fragment>
        </div>
    );
    // }
}

export default AccountStatement;