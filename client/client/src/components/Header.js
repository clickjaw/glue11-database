{this.state.toDoList.map((obj) => (
  <Card style={{ margin: "10px", padding: "10px", display: 'inline'}}>
    {/* dueDate =  */}
    <Card.Title>{obj.dueDate}</Card.Title>
    {/* description =  */}
    <Card.Text>{obj.toDoDescription}</Card.Text>
    {/* <Card.Footer>{obj.complete}</Card.Footer> */}
  </Card>
))}