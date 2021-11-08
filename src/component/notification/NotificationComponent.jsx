import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios'
import "./Notification.css";

const NotificationComponent = props => {

    const [notificationDto, setNotificationObj] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("/notification-api/notifications/"+localStorage.getItem("custId"));
       
        if(result.data.code===200){
            setNotificationObj(result.data.data);
        }
       
    };

    return (
        <div>
            <Fragment>
                <h2 style={{ color: "white" }}>Notification</h2>
                <hr style={{ height: "2px", color: "gray", backgroundColor: "white", borderWidth: "0" }}></hr>
            </Fragment>

                {notificationDto.map((notification, index) => (
                        <div className="container1 bootstrap snippets bootdey">
                            <div className="alert alert-success alert-white rounded" data-toggle="collapse" href={"#multiCollapseExample"+ notification.notification_id} role="button" aria-expanded="false" aria-controls={"#multiCollapseExample"+ notification.notification_id}>
                                <div className="icon">
                                    <i className="fa fa-check"></i>
                                </div>
                                <strong>Success! </strong>
                                {notification.notification_subject}
                            </div>
                            <div className="collapse multi-collapse" id={"multiCollapseExample"+ notification.notification_id}>
                                <div className="card card-body">
                                {notification.message}
                                </div>
                            </div>
                        </div>
                    ))}
        </div>
    );
}

export default NotificationComponent;