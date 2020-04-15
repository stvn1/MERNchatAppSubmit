import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default class EditRoom extends Component {
  constructor(props) {
    super(props);

    this.onchangeRoomName = this.onchangeRoomName.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      name: ""
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://localhost:3001/rooms/edit-room/" + this.props.match.params.id
      )
      .then(res => {
        this.setState({
          name: res.data.name
        });
      })
      .catch(error => {
        console.log(error);
      });
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
      .put(
        "http://localhost:3001/rooms/update-room/" + this.props.match.params.id,
        roomObject
      )
      .then(res => {
        console.log(res.data);
        console.log("Room successfully updated");
      })
      .catch(error => {
        console.log(error);
      });

    // Redirect to room List
    // this.props.history.push("/room-list");
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
            Update Room
          </Button>
        </Form>
      </div>
    );
  }
}
