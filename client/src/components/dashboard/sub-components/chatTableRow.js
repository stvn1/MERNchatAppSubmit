import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";

export default class eventTableRow extends Component {
  constructor(props) {
    super(props);
    this.deleteEvent = this.deleteEvent.bind(this);
  }

  //   {
  //     content: {
  //       type: String,
  //     },
  //     name: {
  //       type: String,
  //     },
  //     roomname: {
  //       type: String,
  //     },
  //   },

  deleteEvent() {
    axios
      .delete("http://localhost:3001/chat/delete-chat/" + this.props.obj._id)
      .then(res => {
        console.log("Chat successfully deleted!");
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <tr>
        <td>{this.props.obj.content}</td>
        <td>{this.props.obj.name}</td>
        <td>{this.props.obj.roomname}</td>
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
