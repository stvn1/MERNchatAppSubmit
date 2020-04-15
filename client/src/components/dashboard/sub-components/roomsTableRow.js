import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default class eventTableRow extends Component {
  constructor(props) {
    super(props);
    // this.deleteEvent = this.deleteEvent.bind(this);
  }

  // deleteEvent() {
  //   axios
  //     .delete("http://localhost:4001/events/delete-event/" + this.props.obj._id)
  //     .then(res => {
  //       console.log("Event successfully deleted!");
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  render() {
    // console.log(this.props);
    return (
      <tr>
        <td>{this.props.obj.name}</td>
        <td>
          {/* <Link className="edit-link" to={"/edit-rooms/" + this.props.obj._id}>
            Edit
          </Link> */}
          {/* <Button onClick={this.deleteStudent} size="sm" variant="danger">
            Delete
          </Button> */}
        </td>
      </tr>
    );
  }
}
