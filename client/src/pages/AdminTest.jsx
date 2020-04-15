import React, { Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import EventsTableRow from "../components/dashboard/sub-components/eventsTableRow";
import CreateRoom from "../components/dashboard/sub-components/createRoom";
import EditRoom from "../components/dashboard/sub-components/editRoom";

export default class AdminTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
    // state, before delete anything
    const currentEvents = this.state.events;

    // Remove deleted item from state.
    this.setState({
      events: currentEvents.filter(event => event.id !== event.id)
    });
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
      <div>
        <Router>
          <div>
            <Container>
              <Navbar.Brand>
                <Link to={"/create-room"} className="nav-link">
                  Create a new room
                </Link>
              </Navbar.Brand>
            </Container>

            <Container>
              <Row>
                <Col md={12}>
                  <div className="wrapper">
                    <Switch>
                      <Route path="/create-room" component={CreateRoom} />
                      <Route path="/edit-room/:id" component={EditRoom} />
                      {/* <Route path="/edit-student/:id" component={EditStudent} />
                  <Route path="/student-list" component={StudentList} /> */}
                    </Switch>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </Router>
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
      </div>
    );
  }
}
