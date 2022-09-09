import React, { Component } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";

export default class AllToDo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toDoList: [],
    };
  }

  componentDidMount() {
    this.getToDo();
  }

  getToDo = async () => {
    const API = "http://localhost:3004/todo";
    let res = await axios.get(API);
    this.setState({
      toDoList: res.data,
    });
    // console.log(this.description)
    // this.setState({dueDate: res.dueDate})
    console.log(this.state.toDoList);
  };

  handleCreateForm = (event) => {
    event.preventDefault();
    // create an object with the required fields for our model
    const newInfo = {
      toDoDescription: event.target.toDoDescription.value,
      dueDate: event.target.dueDate.value,
    };
    this.handleCreate(newInfo); // pass this into our create function!
  };

  handleDelete = async (todoDelete) => {
    const url = `http://localhost:3004/todos/${todoDelete}`; // finds the ObjectID for us :0
    console.log(todoDelete);
    try {
      const response = await axios.delete(url);
      console.log(response.data);
      const filteredOut = this.state.toDoList.filter(
        (todo) => todo._id !== todoDelete
      );
      this.setState({ toDoList: filteredOut });
    } catch (error) {
      console.log(error);
    }
  };

  handleCreate = async (info) => {
    const URL = `http://localhost:3004/new-todo`;

    const response = await axios.post(URL, info);

    const newToDo = response.data;
    this.setState(
      {
        toDo: [...this.state.toDoList, newToDo],
      },
      () => this.getToDo()
    );
  };

  render() {
    const toDoList = this.state;

    return (
      <>
        {/* {toDoList !== null
          ? toDoList.map((item) => {
              return (
                <div key={item._id}>
                  <h1>{item.toDoDescription}</h1>
                  <button onClick={() => this.handleDelete(item._id)}>
                    Delete
                  </button>
                </div>
              );
            })
          : null} */}

        <div style={{ display: "grid", justifyContent: "center" }}>
          {/* <button onClick={this.getToDo}>To Do</button> */}
          <form onSubmit={this.handleCreateForm} style={{ display: "grid" }}>
            <input
              type="text"
              name="toDoDescription"
              placeholder="Enter a Chore"
              style={{ margin: "10px" }}
            />
            <input
              type="date"
              name="dueDate"
              placeholder="Due Date"
              style={{ margin: "10px" }}
            />
            <Button
              type="submit"
              style={{
                display: "grid",
                justifyContent: "center",
                width: "200px",
                margin: "10px",
              }}
            >
              Submit
            </Button>
          </form>

          {this.state.toDoList.map((obj) => (
            <Card
              style={{ margin: "10px", padding: "10px", display: "inline" }}
            >
              {/* dueDate =  */}
              <Card.Title>{obj.dueDate}</Card.Title>
              {/* description =  */}
              <Card.Text>{obj.toDoDescription}</Card.Text>
              {/* <Card.Footer>{obj.complete}</Card.Footer> */}
            </Card>
          ))}
        </div>
      </>
    );
  }
}
