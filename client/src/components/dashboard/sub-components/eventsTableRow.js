import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";

export default class eventTableRow extends Component {
  constructor(props) {
    super(props);
    this.deleteEvent = this.deleteEvent.bind(this);
  }

  deleteEvent() {
    axios
      .delete("http://localhost:3001/events/delete-event/" + this.props.obj._id)
      .then(res => {
        console.log("Event successfully deleted!");
      })
      .catch(error => {
        console.log(error);
      });
    // state, before delete anything
    // const currentEvents = this.state.props;

    // // Remove deleted item from state.
    // this.setState({
    //   events: currentEvents.filter(event => props._id !== props._id)
    // });
    // console.log(props);
  }

  render() {
    return (
      <tr>
        <td>{this.props.obj.event}</td>
        {/* <td>Created at: {this.props.obj.createdAt}</td> */}
        <td>
          <Button onClick={this.deleteEvent} size="sm" variant="danger">
            Delete
          </Button>
        </td>
      </tr>
    );
  }
}
