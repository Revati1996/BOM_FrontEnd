// import React, {Fragment, useState } from 'react';
// import axios from 'axios'
// import { useHistory } from "react-router-dom";

// // class AccountTransaction extends Component {
// const RaiseTicket = () => {

//     let history = useHistory();

//     const [raiseConcernsObj, setRaiseConcernsObj] = useState({
//         create_date: "",
//         cust_id: "",
//         email: "",
//         last_updated_date: "",
//         message: "",
//         phone_number: "",
//         ticket_number: "",
//         ticket_status: "Open"
        
//     });

//     const { create_date, cust_id, email, last_updated_date,message,phone_number,ticket_number,ticket_status} = raiseConcernsObj;

//     const onInputChange = e => {
//         setRaiseConcernsObj({ ...raiseConcernsObj, [e.target.name]: e.target.value });
//     };

//     const onSubmit = async e => {
//         e.preventDefault();
//         await axios.post("http://localhost:8081/customer/ticket", raiseConcernsObj);
//         history.push("/");
//     };

//     return (
//         <div>
//             <Fragment>
//                 <Fragment>
//                     <h2 style={{ color: "white" }}>Raise Concerns</h2>
//                     <hr style={{ height: "2px", color: "gray", backgroundColor: "white", borderWidth: "0" }}></hr>
//                 </Fragment>
//                 <div className="row centered-statement-form">
//                     <div className="col-xs-12 col-sm-6 col-md-6 col-sm-offset-2 col-md-offset-4">
//                         <div className="panel panel-default">
//                             <div className="panel-body">
//                                 <form style={{ padding: "10px" }} onSubmit={e => onSubmit(e)}>
//                                     <div className="row">
//                                         <div className="col-xs-6 col-sm-6 col-md-6">
//                                             <div className="form-group">
//                                                 <label>Customer Id</label>
//                                                 <input type="text"
//                                                     name="cust_id"
//                                                     className="form-control input-sm"
//                                                     value={setRaiseConcernsObj.cust_id}
//                                                      onChange={e => onInputChange(e)}
//                                                     placeholder="Customer Id" />
//                                             </div>
//                                         </div>
//                                         <div className="col-xs-6 col-sm-6 col-md-6">
//                                             <div className="form-group">
//                                                 <label>Email</label>
//                                                 <input type="text"
//                                                     name="email"
//                                                     value={setRaiseConcernsObj.email}
//                                                      onChange={e => onInputChange(e)}
//                                                     className="form-control input-sm"
//                                                     placeholder="Email" />
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="row">
//                                     <div className="col-xs-6 col-sm-6 col-md-6">
//                                             <div className="form-group">
//                                                 <label>Phone</label>
//                                                 <input type="text"
//                                                     name="phone_number"
//                                                     value={setRaiseConcernsObj.phone_number}
//                                                     onChange={e => onInputChange(e)}
//                                                     className="form-control input-sm"
//                                                     placeholder="Phone" />
//                                             </div>
//                                         </div>

//                                         <div className="col-xs-6 col-sm-6 col-md-6">
//                                             <div className="form-group">
//                                                 <label>Status</label>
//                                                 <input type="text"
//                                                     name="ticket_status"
//                                                     value={setRaiseConcernsObj.ticket_status}
//                                                     onChange={e => onInputChange(e)}
//                                                     className="form-control input-sm"
//                                                     />
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="row">
//                                     <div className="col-xs-6 col-sm-6 col-md-6">
//                                             <div className="form-group">
//                                                 <label>Message</label>
//                                                 <input type="text"
//                                                     name="message"
//                                                     value={setRaiseConcernsObj.message}
//                                                     onChange={e => onInputChange(e)}
//                                                     className="form-control input-sm"
//                                                     placeholder="Message" />
//                                             </div>
//                                         </div>

                                       
//                                     </div>
//                                     <input type="submit" value="Submit" className="btn btn-info btn-block" />

//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </Fragment>
//         </div>
//     );
// }

// export default RaiseTicket;


import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios'
import { useHistory } from "react-router-dom";

// class AccountTransaction extends Component {
const RaiseTicket = () => {



  let history = useHistory();

  const [message, setMessage] = useState("");

  const [customerConcernObj, setCustomerConcernObj] = useState({
    cust_id: localStorage.getItem("custId"),
    email: "",
    phone_number: "",
    description :"",
    ticket_status: "Open"

  });

  const cancelData = () => {
    setCustomerConcernObj({
      cust_id: localStorage.getItem("custId"),
      email: "",
    phone_number: "",
    description :"",
    ticket_status: "Open"
    });

    setMessage("");
  }

  const clearData = () => {
    setCustomerConcernObj({
        cust_id: localStorage.getItem("custId"),
        email: "",
        phone_number: "",
        description :"",
        ticket_status: ""
    });
  }
  const { email, phone_number,description,ticket_status} = customerConcernObj;

  const [CustomerConcernObjDto, setCustomerConcernObjDto] = useState([]);

  const onInputChange = e => {
    setCustomerConcernObj({ ...customerConcernObj, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8081/customer/1/10/0");
    
    console.log(result.data.code);

    if(result.data.code === 200){
        setCustomerConcernObjDto(result.data.data);
    }
    
  };



  const onSubmit = async e => {
    e.preventDefault();
    await axios.post("http://localhost:8081/customer/ticket", customerConcernObj).then(res => {
      console.info("Responce====>", res.status);

      if (res.status === 200) {
        setMessage("Ticket Raised Successfully");
        loadUsers();
        clearData();
      } else {
        setMessage("Failed! 'Try again'");
      }
    })
    history.push("/dashboard/raiseConcerns");
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
                <input type="hidden"
                          name="cust_id"
                          className="form-control input-sm"
                          value={localStorage.getItem("custId")}
                          onChange={e => onInputChange(e)}
                          placeholder="Customer Id"
                          readOnly />
                  <div className="row">                   
                    <div className="col-xs-6 col-sm-6 col-md-6">
                      <div className="form-group">
                        <label>Email</label>
                        <input type="email"
                          name="email"
                          value={email}
                          onChange={e => onInputChange(e)}
                          className="form-control input-sm"
                          placeholder="Enter Email"                          
                          required />
                      </div>
                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-6">
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input type="text"
                          name="phone_number"
                          value={phone_number}
                          onChange={e => onInputChange(e)}
                          className="form-control input-sm"
                          placeholder="Enter Phone Number"
                          
                          required />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12">
                      <div className="form-group">
                        <label>Message</label>
                        <input type="text"
                          name="description"
                          value={description}
                          onChange={e => onInputChange(e)}
                          className="form-control input-sm"
                          placeholder="Enter Message"
                          
                          required />
                      </div>
                    </div>
                   
                  </div>
                  <div className="row">                          
                  
                    <div className="col-xs-6 col-sm-6 col-md-6">
                      <div className="form-group">
                        <label>Status</label>
                        <input type="text"
                          name="status"
                          value={ticket_status}
                          onChange={e => onInputChange(e)}
                          className="form-control input-sm"
                          readOnly                          
                          required />
                      </div>
                    </div>
                  </div>
                  
                  <div className="row">
                    <div className="col-xs-3 col-sm-3 col-md-3">
                      <div className="form-group">
                      <input type="submit" value="Submit" className="btn btn-info btn-block" />
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
                      {CustomerConcernObjDto.map((customerConcern, index) => (
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

export default RaiseTicket;