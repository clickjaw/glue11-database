import React, { Component } from 'react'
import axios from 'axios';
import Card from "react-bootstrap/Card"

export default class AllToDo extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
         toDoList: [],
      }
    }

    getToDo = async() =>{            
            const API = "http://localhost:3004/todo";
            let res = await axios.get(API);
            this.setState({
              toDoList: res.data
            })
            // console.log(this.description)
            // this.setState({dueDate: res.dueDate})
            console.log(this.state.toDoList)

    }


  render() {
    return (
      <div>
        <button onClick={this.getToDo}>To Do</button>
        {this.state.toDoList.map((obj)=>
        <Card>
        description = {obj.toDoDescription}<br/>
        dueDate = {obj.dueDate}
        </Card>
        )}

      </div>
    )
  }
}
