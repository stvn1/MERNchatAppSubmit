import React, { Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

import EventsTableRow from "./";

export default class eventsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }
  //Get Data
  componentDidMount() {
    axios
      .get("http://localhost:3001/events/")
      .then(res => {
        console.log(res);
        this.setState({
          events: res.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  DataTable() {
    return this.state.events.map((res, i) => {
      return <EventsTableRow obj={res} key={i} />;
    });
  }

  render() {
    return (
      <div className="table-wrapper">
        <div className="table-wrapper">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Event</th>
              </tr>
            </thead>
            <tbody>{this.DataTable()}</tbody>
          </Table>
        </div>
      </div>
    );
  }
}
