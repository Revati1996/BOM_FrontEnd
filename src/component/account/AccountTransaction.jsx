import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios'
import { useHistory } from "react-router-dom";

// class AccountTransaction extends Component {
const AccountTransaction = () => {



  let history = useHistory();

  const [message, setMessage] = useState("");

  const [accountTransactionObj, setAccountTransactionObj] = useState({
    account_id: localStorage.getItem("accountNumber"),
    amount: "",
    type: "Debit",

  });

  const cancelData = () => {
    setAccountTransactionObj({
      account_id: localStorage.getItem("accountNumber"),
      amount: "",
      type: "",
    });

    setMessage("");
  }

  const clearData = () => {
    setAccountTransactionObj({
      account_id: localStorage.getItem("accountNumber"),
      amount: "",
      type: "",
    });
  }
  const { amount, type } = accountTransactionObj;

  const [accountTransactionDto, setAccountTransactionDto] = useState([]);

  const onInputChange = e => {
    setAccountTransactionObj({ ...accountTransactionObj, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("/accounts-api/accounts/statement/"+localStorage.getItem("accountNumber")+"/10/0");
    
    console.log(result.data.code);

    if(result.data.code === 200){
      setAccountTransactionDto(result.data.data);
    }
    
  };



  const onSubmit = async e => {
    e.preventDefault();

    await axios.post("/accounts-api/accounts/transaction", accountTransactionObj).then(res => {
      console.info("Responce====>", res.status);

      if (res.status === 200) {
        setMessage("Transaction Successfully");
        loadUsers();
        clearData();
      } else {
        setMessage("Failed! 'Try again'");
      }
    })
    history.push("/dashboard/accountTransaction");
  };

  return (
    <div>
      <Fragment>
        <Fragment>
          <h2 style={{ color: "white" }}>Account Transaction Details</h2>
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
                          name="account_id"
                          className="form-control input-sm"
                          value={localStorage.getItem("accountNumber")}
                          onChange={e => onInputChange(e)}
                          placeholder="Account Number"
                          readOnly />
                      </div>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-6">
                      <div className="form-group">
                        <label>Amount</label>
                        <input type="number"
                          name="amount"
                          value={amount}
                          onChange={e => onInputChange(e)}
                          className="form-control input-sm"
                          placeholder="Enter Amount"
                          min="1"
                          required />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-6 col-sm-6 col-md-6">
                      <div className="form-group">
                        <label>Account Transaction</label>
                        <select className="form-control"
                          name="type"
                          value={type}
                          onChange={e => onInputChange(e)}
                          placeholder="Select Account Trasaction Type"
                          required
                        >
                          <option value="Debit">Debit</option>
                          <option value="Credit">Credit </option>
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
                        {/* <th scope="col">Date</th> */}
                        <th scope="col">Type</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Total balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {accountTransactionDto.map((accountTransaction, index) => (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>{accountTransaction.account_Number}</td>
                          {/* <td>{accountTransaction.tran_Date}</td> */}
                          <td>{accountTransaction.tran_Type}</td>
                          <td>{accountTransaction.amount}</td>
                          <td>{accountTransaction.account_Balance}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          </div>
        </div>
      </Fragment>
    </div>
  );
}

export default AccountTransaction;