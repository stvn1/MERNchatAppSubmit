import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default class CreateRoom extends Component {
  constructor(props) {
    super(props);

    // Setting up functions
    this.onchangeRoomName = this.onchangeRoomName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      name: ""
    };
  }

  onchangeRoomName(e) {
    this.setState({ name: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const roomObject = {
      name: this.state.name
    };
    axios
      .post("http://localhost:3001/rooms/create-room", roomObject)
      .then(res => console.log(res.data));

    this.setState({ name: "" });
  }

  render() {
    return (
      <div className="form-wrapper">
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="Name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={this.state.name}
              onChange={this.onchangeRoomName}
            />
          </Form.Group>

          <Button variant="danger" size="lg" block="block" type="submit">
            Create room
          </Button>
        </Form>
      </div>
    );
  }
}
