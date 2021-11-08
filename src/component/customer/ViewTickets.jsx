import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios'
import { useHistory } from "react-router-dom";

// class AccountTransaction extends Component {
const ViewTicket = () => {



  let history = useHistory();

  const [message, setMessage] = useState("");

  const [viewConcernObj, setViewConcernObj] = useState({
    ticket_number: ""
    
  });

  const cancelData = () => {
    setViewConcernObj({
    ticket_number: ""
   
    });

    setMessage("");
  }

  const clearData = () => {
    setViewConcernObj({
        ticket_number: "",
       
    });
  }
  const { ticket_number} = viewConcernObj;

  const [ViewConcernObjDto, setViewConcernObjDto] = useState([]);

  const onInputChange = e => {
    setViewConcernObj({ ...viewConcernObj, [e.target.name]: e.target.value });
  };

  // useEffect(() => {
  //   loadUsers();
  // }, []);

  // const loadUsers = async () => {
  //   const result = await axios.get("http://localhost:8081/customer/1/10/0");
    
  //   console.log(result.data.code);

  //   if(result.data.code === 200){
  //       setCustomerConcernObjDto(result.data.data);
  //   }
    
  // };



  const onSubmit = async e => {
    e.preventDefault();
    const result = await axios.get("http://localhost:8081/customer/ticket/" + localStorage.getItem("custId") + "/" + viewConcernObj.ticket_number + "/10/0");
    
    console.log(result.data.code);

    if(result.data.code === 200){
        setViewConcernObjDto(result.data.data);
    }
  };

  return (
    <div>
      <Fragment>
        <Fragment>
          <h2 style={{ color: "white" }}>Raise Customer Concerns</h2>
          <hr style={{ height: "2px", color: "gray", backgroundColor: "white", borderWidth: "0" }}></hr>
        </Fragment>
        <div className="row centered-statement-form">
          <div className="col-xs-12 col-sm-12 col-md-12 col-sm-offset-2 col-md-offset-4">
            <div className="panel panel-default">
              {message ? <h4 className="alert alert-danger">{message}</h4> : null}
              <div className="panel-body">
                <form style={{ padding: "10px" }} onSubmit={e => onSubmit(e)}>
                  <div className="row">
                    <div className="col-xs-6 col-sm-6 col-md-6">
                      <div className="form-group">
                        <label>Ticket Number</label>
                        <input type="text"
                          name="ticket_number"
                          className="form-control input-sm"
                          value={ticket_number}
                          onChange={e => onInputChange(e)}
                          placeholder="Ticket Number"
                          />
                      </div>
                    </div>
                  
                  </div>
             
               
                  <div className="row">
                    <div className="col-xs-3 col-sm-3 col-md-3">
                      <div className="form-group">
                      <input type="submit" value="Search" className="btn btn-info btn-block" />
                      </div>
                    </div>
                    <div className="col-xs-3 col-sm-3 col-md-3">
                      <div className="form-group">
                        <input type="button" value="Cancel" onClick={cancelData} className="btn btn-danger btn-block" />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-xs-12 col-sm-12 col-md-12 col-sm-offset-2 col-md-offset-4">
            <div className="panel panel-default" style={{ padding: "10px" }} >
              <div className="panel-heading">
                <h3 className="panel-title" style={{ padding: "10px" }}>Customer Concerns</h3>
              </div>
              <div className="panel-body">
                <div className="py-0">
                  <table className="table border shadow">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Ticket Number</th>
                        {/* <th scope="col">Date</th> */}
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Message</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ViewConcernObjDto.map((customerConcern, index) => (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>{customerConcern.ticket_number}</td>
                          {/* <td>{accountTransaction.tran_Date}</td> */}
                          <td>{customerConcern.email}</td>
                          <td>{customerConcern.phone_number}</td>
                          <td>{customerConcern.description}</td>
                          <td>{customerConcern.ticket_status}</td>
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

export default ViewTicket;