import * as React from 'react';

const AlertsComponent = ({
    alerts
}) => (
    <div className="notebookAlerts">
        <ul>
            {
                this.props.alerts.map((alert,index) =>
                    <li key={index}>
                        You received a new notebook!
                        <div className="card-footer">
                            <button className="btn btn-sm btn-primary"
                                    onClick={(alert,index) => {this.props.acceptNotebook({alert:alert,index:index})}}><i className="fa fa-dot-circle-o"/> Submit
                            </button>
                            <button className="btn btn-sm btn-danger"
                                    onClick={(alert,index) => {this.props.rejectNotebook({alert:alert,index:index})}}><i className="fa fa-ban"/> Reject</button>
                        </div>
                    </li>
                )
            }
        </ul>
    </div>
);

export default AlertsComponent;